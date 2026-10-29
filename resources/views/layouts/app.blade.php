<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#0a0a0a">
    <title>@yield('title','Quantum Tech | Industrial Power Transmission UAE')</title>
    <meta name="description" content="@yield('meta_description','Quantum Tech supplies industrial gearboxes, motors, drives and engineering solutions across UAE and GCC.')">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script defer src="{{ asset('js/site.js') }}"></script>
    @stack('head')
</head>
<body>
<div class="utility-bar">
    <div class="container utility-inner">
        <span>Dubai, United Arab Emirates</span>
        <div class="utility-links">
            <a href="tel:{{ config('quantum.phone') }}">{{ config('quantum.phone') }}</a>
            <a href="mailto:{{ config('quantum.email') }}">{{ config('quantum.email') }}</a>
            <span class="language-chip">EN</span>
        </div>
    </div>
</div>

<header class="site-header" data-header>
    <div class="container site-nav">
        <a href="{{ route('home') }}" class="brand-mark" aria-label="Quantum Tech home">
            <span class="brand-symbol">QT</span>
            <span class="brand-name">QUANTUM <b>TECH</b></span>
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
            <a href="{{ route('products.index') }}">Products</a>
            <a href="{{ route('brands.index') }}">Brands</a>
            <a href="{{ route('industries.index') }}">Industries</a>
            <a href="{{ route('solutions.index') }}">Solutions</a>
            <a href="{{ route('resources.index') }}">Resources</a>
            <a href="{{ route('about') }}">Company</a>
        </nav>

        <div class="nav-actions">
            <button class="icon-button" type="button" data-search-open aria-label="Open search">
                <span></span><span></span>
            </button>
            <a class="nav-rfq" href="{{ route('rfq.create') }}">Request Quote <span>↗</span></a>
            <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">
                <span></span><span></span>
            </button>
        </div>
    </div>
</header>

<div class="mobile-menu" data-mobile-menu aria-hidden="true">
    <div class="container mobile-menu-inner">
        <div class="mobile-menu-meta">Navigate / Quantum Tech</div>
        <nav>
            <a href="{{ route('products.index') }}"><span>01</span>Products</a>
            <a href="{{ route('brands.index') }}"><span>02</span>Brands</a>
            <a href="{{ route('industries.index') }}"><span>03</span>Industries</a>
            <a href="{{ route('solutions.index') }}"><span>04</span>Solutions</a>
            <a href="{{ route('resources.index') }}"><span>05</span>Resources</a>
            <a href="{{ route('about') }}"><span>06</span>Company</a>
            <a href="{{ route('contact') }}"><span>07</span>Contact</a>
        </nav>
        <div class="mobile-menu-footer">
            <a href="{{ route('rfq.create') }}">Request a Quote</a>
            <a href="{{ route('replacement.create') }}">Upload Nameplate</a>
        </div>
    </div>
</div>

<div class="search-overlay" data-search-overlay aria-hidden="true">
    <button class="search-close" type="button" data-search-close aria-label="Close search">×</button>
    <div class="container search-overlay-inner">
        <span class="section-kicker">Search / Quantum Tech</span>
        <form action="{{ route('search') }}" method="get" class="overlay-search-form">
            <label for="global-search">What are you looking for?</label>
            <div class="overlay-search-row">
                <input id="global-search" name="q" placeholder="Products, brands, model numbers..." autocomplete="off">
                <button type="submit">Search ↗</button>
            </div>
        </form>
        <div class="search-suggestions">
            <span>Try:</span>
            <a href="{{ route('search',['q'=>'gearbox']) }}">Gearbox</a>
            <a href="{{ route('search',['q'=>'motor']) }}">Electric Motor</a>
            <a href="{{ route('search',['q'=>'VFD']) }}">VFD</a>
            <a href="{{ route('search',['q'=>'CAD']) }}">CAD</a>
        </div>
    </div>
</div>

<main>
    @if(session('success'))
        <div class="container alert">{{ session('success') }}</div>
    @endif
    @yield('content')
</main>

<a class="floating-whatsapp" target="_blank" rel="noopener" href="https://wa.me/{{ config('quantum.whatsapp') }}?text={{ urlencode('Hello Quantum Tech, I need industrial product assistance.') }}" aria-label="Chat with Quantum Tech on WhatsApp">
    <span>WA</span>
    <small>Talk to sales</small>
</a>

<footer class="site-footer">
    <div class="container footer-top">
        <div>
            <span class="section-kicker light-kicker">Quantum Tech / Dubai</span>
            <h2>Engineering motion.<br>Delivering reliability.</h2>
        </div>
        <a class="round-link" href="{{ route('contact') }}">Contact<br>our team <span>↗</span></a>
    </div>

    <div class="container footer-grid">
        <div class="footer-about">
            <a href="{{ route('home') }}" class="brand-mark footer-brand">
                <span class="brand-symbol">QT</span>
                <span class="brand-name">QUANTUM <b>TECH</b></span>
            </a>
            <p>Industrial power transmission, motors, drives and engineering solutions for UAE & GCC.</p>
        </div>
        <div>
            <h4>Explore</h4>
            <a href="{{ route('products.index') }}">Products</a>
            <a href="{{ route('brands.index') }}">Brands</a>
            <a href="{{ route('industries.index') }}">Industries</a>
            <a href="{{ route('resources.index') }}">Technical Resources</a>
        </div>
        <div>
            <h4>Company</h4>
            <a href="{{ route('about') }}">About</a>
            <a href="{{ route('solutions.index') }}">Engineering Solutions</a>
            <a href="{{ route('case-studies.index') }}">Case Studies</a>
            <a href="{{ route('blog.index') }}">Knowledge Center</a>
        </div>
        <div>
            <h4>Get in touch</h4>
            <p>{{ config('quantum.address') }}</p>
            <a href="tel:{{ config('quantum.phone') }}">{{ config('quantum.phone') }}</a>
            <a href="mailto:{{ config('quantum.email') }}">{{ config('quantum.email') }}</a>
        </div>
    </div>

    <div class="container footer-wordmark" aria-hidden="true">QUANTUM TECH</div>
    <div class="container footer-bottom">
        <span>© {{ date('Y') }} Quantum Tech. All rights reserved.</span>
        <div><a href="{{ route('privacy') }}">Privacy</a><a href="{{ route('terms') }}">Terms</a></div>
    </div>
</footer>

<div class="mobile-actions">
    <a href="tel:{{ config('quantum.phone') }}">Call</a>
    <a href="https://wa.me/{{ config('quantum.whatsapp') }}">WhatsApp</a>
    <a href="{{ route('rfq.create') }}">RFQ</a>
</div>
</body>
</html>
