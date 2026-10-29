(() => {
    const body = document.body;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Global navigation / search */
    const menu = document.querySelector('[data-mobile-menu]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const search = document.querySelector('[data-search-overlay]');
    const searchOpen = document.querySelector('[data-search-open]');
    const searchClose = document.querySelector('[data-search-close]');
    const header = document.querySelector('[data-header]');

    const setMenu = (open) => {
        if (!menu || !menuToggle) return;
        menu.classList.toggle('is-open', open);
        menu.setAttribute('aria-hidden', String(!open));
        menuToggle.setAttribute('aria-expanded', String(open));
        body.classList.toggle('menu-open', open);
    };

    const setSearch = (open) => {
        if (!search) return;
        search.classList.toggle('is-open', open);
        search.setAttribute('aria-hidden', String(!open));
        body.classList.toggle('search-open', open);
        if (open) setTimeout(() => search.querySelector('input')?.focus(), 120);
    };

    menuToggle?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    searchOpen?.addEventListener('click', () => setSearch(true));
    searchClose?.addEventListener('click', () => setSearch(false));
    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenu(false);
            setSearch(false);
        }
    });

    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    /* Cinematic opening - only once per tab/session */
    const opening = document.querySelector('[data-site-intro]');
    if (opening) {
        const skip = opening.querySelector('[data-intro-skip]');
        const alreadyPlayed = sessionStorage.getItem('qt-opening-played') === '1';
        const closeOpening = () => {
            opening.classList.add('is-hidden');
            sessionStorage.setItem('qt-opening-played', '1');
            window.setTimeout(() => opening.remove(), 700);
        };

        if (alreadyPlayed || prefersReducedMotion) {
            opening.remove();
        } else {
            body.style.overflow = 'hidden';
            window.setTimeout(() => {
                body.style.overflow = '';
                closeOpening();
            }, 4200);
            skip?.addEventListener('click', () => {
                body.style.overflow = '';
                closeOpening();
            }, { once: true });
        }
    }

    /* Hero autoplay slider */
    const hero = document.querySelector('[data-hero-slider]');
    if (hero) {
        const slides = [...hero.querySelectorAll('[data-hero-slide]')];
        const previous = hero.querySelector('[data-hero-prev]');
        const next = hero.querySelector('[data-hero-next]');
        const currentLabel = hero.querySelector('[data-hero-current]');
        const progress = hero.querySelector('[data-hero-progress]');
        const dotsWrap = hero.querySelector('[data-hero-dots]');
        let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
        let timer = null;
        let pointerStart = 0;
        let pointerActive = false;
        const duration = 6500;

        const dots = slides.map((_, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-label', `Go to slide ${String(index + 1).padStart(2, '0')}`);
            button.addEventListener('click', () => show(index, true));
            dotsWrap?.appendChild(button);
            return button;
        });

        const restartProgress = () => {
            if (!progress || prefersReducedMotion) return;
            progress.classList.remove('is-running');
            void progress.offsetWidth;
            progress.classList.add('is-running');
        };

        const show = (index, userInitiated = false) => {
            if (!slides.length) return;
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                const active = i === current;
                slide.classList.toggle('is-active', active);
                slide.setAttribute('aria-hidden', String(!active));
            });
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
            if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2, '0');
            restartProgress();
            if (userInitiated) schedule();
        };

        const schedule = () => {
            if (timer) window.clearInterval(timer);
            if (!prefersReducedMotion && slides.length > 1) {
                timer = window.setInterval(() => show(current + 1), duration);
            }
        };

        previous?.addEventListener('click', () => show(current - 1, true));
        next?.addEventListener('click', () => show(current + 1, true));
        hero.addEventListener('mouseenter', () => timer && window.clearInterval(timer));
        hero.addEventListener('mouseleave', schedule);
        hero.addEventListener('focusin', () => timer && window.clearInterval(timer));
        hero.addEventListener('focusout', schedule);
        hero.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') show(current - 1, true);
            if (event.key === 'ArrowRight') show(current + 1, true);
        });

        hero.addEventListener('pointerdown', (event) => {
            if (event.target.closest('a, button')) return;
            pointerActive = true;
            pointerStart = event.clientX;
        });
        hero.addEventListener('pointerup', (event) => {
            if (!pointerActive) return;
            pointerActive = false;
            const delta = event.clientX - pointerStart;
            if (Math.abs(delta) < 56) return;
            show(current + (delta < 0 ? 1 : -1), true);
        });
        hero.addEventListener('pointercancel', () => { pointerActive = false; });

        hero.setAttribute('tabindex', '0');
        show(current);
        schedule();
    }

    /* Reusable horizontal sliders with mouse/touch drag */
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
        const viewport = carousel.querySelector('[data-carousel-viewport]');
        const track = carousel.querySelector('[data-carousel-track]');
        const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
        const previous = carousel.querySelector('[data-carousel-prev]');
        const next = carousel.querySelector('[data-carousel-next]');
        const currentLabel = carousel.querySelector('[data-carousel-current]');
        const progress = carousel.querySelector('[data-carousel-progress]');
        const mode = carousel.dataset.carouselMode || 'cards';
        if (!viewport || !track || !slides.length) return;

        let index = 0;
        let dragging = false;
        let pointerStart = 0;
        let scrollStart = 0;
        let rafId = 0;

        const maxIndex = () => mode === 'full' ? slides.length - 1 : slides.length - 1;
        const step = () => {
            if (mode === 'full') return viewport.clientWidth;
            const first = slides[0];
            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.gap || '0');
            return first.getBoundingClientRect().width + gap;
        };

        const updateUi = () => {
            if (currentLabel) currentLabel.textContent = String(index + 1).padStart(2, '0');
            if (progress) progress.style.width = `${((index + 1) / slides.length) * 100}%`;
            previous?.toggleAttribute('disabled', index <= 0);
            next?.toggleAttribute('disabled', index >= maxIndex());
        };

        const goTo = (newIndex, smooth = true) => {
            index = Math.min(maxIndex(), Math.max(0, newIndex));
            const left = mode === 'full' ? index * viewport.clientWidth : index * step();
            viewport.scrollTo({ left, behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto' });
            updateUi();
        };

        const syncFromScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const computed = Math.round(viewport.scrollLeft / Math.max(1, step()));
                index = Math.min(maxIndex(), Math.max(0, computed));
                updateUi();
            });
        };

        previous?.addEventListener('click', () => goTo(index - 1));
        next?.addEventListener('click', () => goTo(index + 1));
        viewport.addEventListener('scroll', syncFromScroll, { passive: true });

        viewport.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            dragging = true;
            pointerStart = event.clientX;
            scrollStart = viewport.scrollLeft;
            viewport.classList.add('is-dragging');
            viewport.setPointerCapture?.(event.pointerId);
        });
        viewport.addEventListener('pointermove', (event) => {
            if (!dragging) return;
            viewport.scrollLeft = scrollStart - (event.clientX - pointerStart);
        });
        const endDrag = (event) => {
            if (!dragging) return;
            dragging = false;
            viewport.classList.remove('is-dragging');
            viewport.releasePointerCapture?.(event.pointerId);
            goTo(Math.round(viewport.scrollLeft / Math.max(1, step())));
        };
        viewport.addEventListener('pointerup', endDrag);
        viewport.addEventListener('pointercancel', endDrag);
        viewport.addEventListener('mouseleave', (event) => dragging && endDrag(event));
        window.addEventListener('resize', () => goTo(index, false));
        updateUi();
    });

    /* Section reveals */
    const revealTargets = document.querySelectorAll('[data-reveal-section], .editorial-section, .page-hero, .replacement-band, .final-cta');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
        revealTargets.forEach((target) => observer.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    }

    /* Parallax response on the engineering stage */
    document.querySelectorAll('[data-parallax-stage]').forEach((stage) => {
        if (prefersReducedMotion) return;
        const floating = [...stage.querySelectorAll('.az-floating-spec')];
        stage.addEventListener('pointermove', (event) => {
            const rect = stage.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            floating.forEach((item, i) => {
                const factor = 7 + i * 5;
                item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
        stage.addEventListener('pointerleave', () => floating.forEach((item) => item.style.transform = ''));
    });

    /* Slight movement on category orbit for pointer users */
    document.querySelectorAll('[data-category-row]').forEach((row) => {
        const orbit = row.querySelector('.az-category-orbit');
        if (!orbit || prefersReducedMotion) return;
        row.addEventListener('pointermove', (event) => {
            const rect = row.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            orbit.style.marginRight = `${x * -24}px`;
        });
        row.addEventListener('pointerleave', () => orbit.style.marginRight = '');
    });
})();
