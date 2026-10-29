# Quantum Tech Industrial Platform

Laravel + MySQL implementation based on the **Dubai Industrial Power Transmission Website** requirements document.

## Included in this package

### Public website
- Premium industrial homepage for UAE/GCC positioning
- Product catalogue with search, brand and industry filters
- Product detail pages with database-driven technical specifications
- Brand directory and brand product pages
- Industry/application pages
- Engineering solutions pages
- Technical resource / catalogue / CAD library
- Product comparison route
- Global search
- Blog / knowledge center
- Case studies
- Contact form
- RFQ form with attachments and unique RFQ number
- Nameplate / replacement request workflow
- WhatsApp, phone and email CTAs
- SEO-friendly slugs and meta fields
- Mobile responsive layout

### Admin
- Secure Laravel session authentication
- Dashboard KPIs
- Products CRUD
- Dynamic product attributes/specifications
- Brand/category/industry/application CRUD
- Technical documents CRUD
- RFQ pipeline and assignment/status/priority workflow
- Replacement request workflow
- Contact enquiry listing
- Website settings
- Role field ready for Super Admin, Administrator, Product Manager, Sales, Marketing and Content Editor

### Data structure
- Users / sessions / queues / cache
- Brands
- Hierarchical product categories
- Products + images + dynamic attributes
- Industries and applications (many-to-many)
- Technical documents / CAD / datasheets / catalogues
- Engineering solutions
- Blogs/categories
- Case studies
- Certifications
- RFQs / items / attachments
- Replacement requests
- Contacts / leads / UTM attribution
- Settings
- Activity/analytics event tables

## Requirements

- PHP 8.2+
- Composer 2.x
- MySQL 8.x or MariaDB 10.6+
- PHP extensions normally required by Laravel (`pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`)

## Local installation

```bash
cd quantum-tech-industrial
composer install
cp .env.example .env
php artisan key:generate
```

Create MySQL database:

```sql
CREATE DATABASE quantum_tech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quantum_tech
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run setup:

```bash
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Website: `http://127.0.0.1:8000`

Admin: `http://127.0.0.1:8000/admin/login`

### Development admin account

- Email: `admin@quantumtech.ae`
- Password: `ChangeMe@123`

**Change this password immediately in any real environment.**

## Configure Quantum Tech contact information

Edit `.env`:

```env
QT_PHONE="+971XXXXXXXXX"
QT_WHATSAPP="971XXXXXXXXX"
QT_EMAIL="sales@quantumtech.ae"
QT_ADDRESS="Dubai, United Arab Emirates"
```

## Email

The default `.env.example` uses `MAIL_MAILER=log`, so local testing writes emails to logs rather than delivering them. Configure SMTP before production.

## File uploads

Uploaded product images, documents, RFQ attachments and nameplates use Laravel's `public` disk. Run:

```bash
php artisan storage:link
```

For production, switch to an S3-compatible storage driver if desired.

## Production checklist

Before deployment:

1. Replace all seeded/demo brands, specifications, case studies and text with client-approved information.
2. Replace placeholder UAE contact information.
3. Configure real SMTP.
4. Add CAPTCHA / Cloudflare Turnstile to public forms.
5. Add malware scanning if accepting untrusted engineering files such as ZIP/DWG.
6. Review Privacy Policy, Cookie Policy, Terms and Disclaimer with UAE legal counsel.
7. Configure HTTPS, Cloudflare, firewall, backups and monitoring.
8. Set `APP_ENV=production` and `APP_DEBUG=false`.
9. Use Redis/database queue workers for notifications/imports when enabled.
10. Configure scheduled backups and log rotation.
11. Restrict admin roles by policy/permission as the internal team is finalized.

Typical deployment optimization:

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:work --tries=3
```

## Requirement phases

The source document defines three phases. This repository implements the **core website / digital sales MVP** and includes database foundations for the larger platform.

### Implemented core
Products, brands, industries, solutions, resources, RFQ, replacement/nameplate workflow, search, admin, English UI, SEO-ready structure and lead attribution.

### Recommended next sprint
- Arabic + RTL content management
- UI-driven product comparison persistence
- Advanced specification filters (power/torque/ratio/RPM)
- CAD request approval workflow
- Bulk Excel/CSV product importer
- Full blog/case-study/certification admin CRUD
- SMTP notification templates
- Google Analytics / Search Console production IDs
- Cookie preference manager
- Cloudflare Turnstile

### Engineering platform phase
- Gearbox selector
- Motor selector
- Customer portal / RFQ tracking
- Saved products and project lists
- Technical support tickets
- Distributor portal
- CRM / ERP integration

## API endpoints

```text
GET /api/products
GET /api/products/{slug}
GET /api/brands
GET /api/industries
GET /api/resources
GET /api/search?q=...
```

## Notes

The demo seed data is intentionally generic. It demonstrates the platform's catalogue/specification structure and must not be represented as actual Quantum Tech product/manufacturer data until validated by the client.

---

## UI Redesign – COMINVI-inspired industrial direction

The public-facing interface has been redesigned with an industrial editorial visual language inspired by the interaction and layout direction of `https://www.cominvi.com.mx/`, while keeping Quantum Tech's content, product catalogue, workflows and brand identity independent.

### Updated UI elements

- Dark, high-contrast industrial navigation and full-screen mobile navigation
- Orange Quantum Tech accent system
- Oversized condensed-style typography and editorial section hierarchy
- Numbered `S.01`–`S.07` homepage sections
- Full-height technical hero with an original CSS engineering graphic
- Border-based service/category lists instead of generic rounded cards
- Industrial product showcase cards with technical placeholder artwork
- Large industry index rows
- Engineering-support visual section and indexed solution list
- Horizontal partner-brand marquee
- Nameplate replacement callout
- Large quotation CTA and oversized footer wordmark
- Full-screen global search overlay
- Smooth, lightweight scroll reveal effects
- Responsive mobile layout with persistent Call / WhatsApp / RFQ actions
- Admin area visually aligned to the same Quantum Tech design system

No COMINVI text, images, logo, or proprietary visual assets are bundled in this project. The implementation is an original Quantum Tech UI using similar high-level industrial/editorial design cues.

## Immersive homepage update

The homepage has been enhanced with an original industrial interaction system inspired by the high-level motion language of premium immersive real-estate/editorial websites:

- one-time cinematic opening screen
- 3-scene autoplay hero slider with manual previous/next controls
- animated hero progress indicator
- motion/engineering/RFQ visual scenes built entirely with CSS
- scroll-triggered section reveals
- interactive product carousel with drag, scroll and arrow controls
- full-width industry/perspective slider
- animated category hover details
- engineering parallax specification cards
- pause-on-hover brand marquee
- animated replacement/nameplate CTA
- responsive and reduced-motion accessibility support

No images, text, branding or source assets from the reference website are included in this project.

### Required writable Laravel directories

The package now includes placeholder `.gitignore` files for Laravel's empty runtime directories. If permissions are changed after extraction, run:

```bash
chmod -R 775 bootstrap/cache storage
```
