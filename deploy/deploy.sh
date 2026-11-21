#!/usr/bin/env bash
# Deploy Quantum Tech to SiteGround shared hosting over SSH.
# Run from Git Bash in the project folder:
#
#   bash deploy/deploy.sh --dry-run   build the package only; no connection made
#   bash deploy/deploy.sh --check     test the SSH connection and show server PHP version
#   bash deploy/deploy.sh             build, upload and go live
#   bash deploy/deploy.sh --seed      same, and also seed the database (first deploy only, if not importing SQL)
#   bash deploy/deploy.sh --rollback  switch back to the previous release
#
# Settings live in deploy/deploy.config.
set -euo pipefail

if grep -qi microsoft /proc/version 2>/dev/null; then
  echo "ERROR: this is running in WSL bash, which doesn't have your Windows PHP/Composer or SSH key."
  echo "Run it with Git Bash instead. From PowerShell:"
  echo "  & \"C:\\Program Files\\Git\\bin\\bash.exe\" deploy/deploy.sh --check"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CONFIG="$SCRIPT_DIR/deploy.config"

[ -f "$CONFIG" ] || { echo "ERROR: $CONFIG not found."; exit 1; }
# shellcheck source=/dev/null
source "$CONFIG"

MODE="deploy"
SEED="no"
case "${1:-}" in
  "")          ;;
  --dry-run)   MODE="dry" ;;
  --check)     MODE="check" ;;
  --seed)      SEED="yes" ;;
  --rollback)  MODE="rollback" ;;
  *) sed -n '2,11p' "$0"; exit 1 ;;
esac

REMOTE_BASE="www/$DOMAIN"
SSH_OPTS=(-p "$SSH_PORT" -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30)
SCP_OPTS=(-P "$SSH_PORT" -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new)
TARGET="$SSH_USER@$SSH_HOST"

step() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

# Refuse to connect while the config still has dummy values.
if [ "$MODE" != "dry" ]; then
  if [[ "$SSH_HOST" == *example.com* || "$SSH_USER" == *dummy* || "$DOMAIN" == "example.com" ]]; then
    echo "ERROR: deploy/deploy.config still has dummy values."
    echo "Fill in SSH_HOST, SSH_USER, SSH_KEY and DOMAIN, or use --dry-run to only build the package."
    exit 1
  fi
  [ -f "$SSH_KEY" ] || { echo "ERROR: SSH key not found at $SSH_KEY"; exit 1; }
fi

# ---------------------------------------------------------------- check
if [ "$MODE" = "check" ]; then
  step "Connecting to $TARGET:$SSH_PORT"
  ssh "${SSH_OPTS[@]}" "$TARGET" "echo 'Connected as' \$(whoami); $PHP_BIN -v | head -1; echo; echo 'Site folder:'; ls -la ~/$REMOTE_BASE"
  exit 0
fi

# ---------------------------------------------------------------- rollback
if [ "$MODE" = "rollback" ]; then
  step "Rolling back to previous release"
  ssh "${SSH_OPTS[@]}" "$TARGET" bash -s -- "$REMOTE_BASE" "$APP_DIR_NAME" "$PHP_BIN" <<'REMOTE'
set -euo pipefail
APP="$HOME/$1/$2"; PHP="$3"
[ -d "${APP}_previous" ] || { echo "ERROR: no previous release at ${APP}_previous"; exit 1; }
mv "$APP" "${APP}_failed"
mv "${APP}_previous" "$APP"
mv "${APP}_failed" "${APP}_previous"
cd "$APP"
$PHP artisan config:cache && $PHP artisan route:cache && $PHP artisan view:cache
echo "Rolled back. The release you rolled back from is kept at ${APP}_previous"
REMOTE
  exit 0
fi

# ---------------------------------------------------------------- build
RELEASE="$(date +%Y%m%d%H%M%S)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
PKG="$STAGE/package"
ARCHIVE="$STAGE/qt-release-$RELEASE.tar.gz"
mkdir -p "$PKG"

step "Copying project files"
(cd "$PROJECT_DIR" && tar \
  --exclude=./vendor \
  --exclude=./node_modules \
  --exclude=./deploy \
  --exclude=./.env \
  --exclude=./public/storage \
  --exclude='./storage/logs/*.log' \
  --exclude='./storage/framework/sessions/*' \
  --exclude='./storage/framework/views/*' \
  --exclude='./storage/framework/cache/data' \
  --exclude='./storage/app/public/*' \
  --exclude='./storage/app/private/*' \
  --exclude='./bootstrap/cache/*.php' \
  -cf - .) | (cd "$PKG" && tar -xf -)

step "Installing production dependencies (composer --no-dev)"
(cd "$PKG" && composer install --no-dev --optimize-autoloader --no-interaction --quiet)

step "Creating archive"
tar -czf "$ARCHIVE" -C "$PKG" .
echo "Package: $(du -h "$ARCHIVE" | cut -f1)  ($(tar -tzf "$ARCHIVE" | wc -l) entries)"

if [ "$MODE" = "dry" ]; then
  cp "$ARCHIVE" "$SCRIPT_DIR/"
  echo
  echo "Dry run complete. Package saved to: $SCRIPT_DIR/$(basename "$ARCHIVE")"
  echo "A real deploy would upload it to $TARGET:$SSH_PORT and install it in ~/$REMOTE_BASE/$APP_DIR_NAME"
  exit 0
fi

# ---------------------------------------------------------------- upload
step "Uploading to $TARGET"
scp "${SCP_OPTS[@]}" "$ARCHIVE" "$TARGET:qt-release-$RELEASE.tar.gz"

# ---------------------------------------------------------------- install
step "Installing on server"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s -- "$REMOTE_BASE" "$APP_DIR_NAME" "$PHP_BIN" "$RUN_MIGRATIONS" "$RELEASE" "$SEED" <<'REMOTE'
set -euo pipefail
BASE="$HOME/$1"; NAME="$2"; APP="$BASE/$2"; PHP="$3"; MIGRATE="$4"; REL="$5"; SEED="$6"
ARCHIVE="$HOME/qt-release-$REL.tar.gz"
NEW="${APP}_new"

[ -d "$BASE" ] || { echo "ERROR: site folder $BASE not found. Check DOMAIN in deploy.config."; exit 1; }

echo "Extracting release $REL"
rm -rf "$NEW"; mkdir -p "$NEW"
tar -xzf "$ARCHIVE" -C "$NEW"
rm -f "$ARCHIVE"

# Keep .env, uploads and logs from the live release.
if [ -d "$APP" ]; then
  [ -f "$APP/.env" ] && cp "$APP/.env" "$NEW/.env"
  for d in storage/app/public storage/app/private storage/logs public/.well-known; do
    if [ -d "$APP/$d" ]; then rm -rf "$NEW/$d"; cp -a "$APP/$d" "$NEW/$d"; fi
  done
fi

cd "$NEW"
mkdir -p storage/framework/{cache/data,sessions,views} storage/logs storage/app/public storage/app/private bootstrap/cache
chmod -R u+rwX storage bootstrap/cache

NEED_ENV="no"
if [ ! -f .env ]; then
  echo "No .env on server yet: creating one from .env.example"
  cp .env.example .env
  $PHP artisan key:generate --force
  NEED_ENV="yes"
fi

# Migrate before going live: if it fails, the current site stays up untouched.
if [ "$NEED_ENV" = "no" ] && [ "$MIGRATE" = "yes" ]; then
  echo "Running migrations"
  $PHP artisan migrate --force
  if [ "$SEED" = "yes" ]; then
    echo "Seeding database"
    $PHP artisan db:seed --force
  fi
fi

echo "Switching to new release"
if [ -d "$APP" ]; then rm -rf "${APP}_previous"; mv "$APP" "${APP}_previous"; fi
mv "$NEW" "$APP"

# Point public_html at Laravel's public folder (first deploy only).
cd "$BASE"
if [ -d public_html ] && [ ! -L public_html ]; then
  echo "Moving existing public_html to public_html_old_$REL and linking public_html -> $NAME/public"
  mv public_html "public_html_old_$REL"
  [ -d "public_html_old_$REL/.well-known" ] && cp -a "public_html_old_$REL/.well-known" "$NAME/public/"
  ln -s "$NAME/public" public_html
elif [ ! -e public_html ]; then
  ln -s "$NAME/public" public_html
fi

cd "$APP"
$PHP artisan storage:link --force >/dev/null

if [ "$NEED_ENV" = "yes" ]; then
  echo
  echo "============================================================"
  echo " FIRST DEPLOY: files are in place, but .env needs your details."
  echo " 1. Edit $APP/.env  (APP_URL, DB_*, MAIL_*, QT_*)"
  echo " 2. Import your database in phpMyAdmin, or plan to use --seed"
  echo " 3. Run the deploy again to migrate and cache config."
  echo "============================================================"
  exit 0
fi

$PHP artisan config:cache
$PHP artisan route:cache
$PHP artisan view:cache
echo
echo "Deployed release $REL. Previous release kept at ${APP}_previous (use --rollback to restore)."
REMOTE

step "Done"
