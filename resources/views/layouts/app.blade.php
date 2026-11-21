<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
    <meta name="theme-color" content="#0b0c0e">
    <title>@yield('title', 'Quantum Tech | Industrial Power Transmission UAE')</title>
    <meta name="description" content="@yield('meta_description', 'Quantum Tech supplies industrial gearboxes, motors, drives and engineering solutions across UAE and GCC.')">
    <link rel="icon" type="image/png" href="{{ asset('images/logo/icon.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/logo/icon.png') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/qt.css') }}?v={{ @filemtime(public_path('css/qt.css')) }}">
    <style>
        :root {
            --img-a: url('{{ asset('images/hero/power-transmission.jpg') }}');
            --img-b: url('{{ asset('images/hero/engineering-support.jpg') }}');
            --img-c: url('{{ asset('images/hero/digital-platform.jpg') }}')
        }
    </style>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
    <script defer src="{{ asset('js/qt3d.js') }}?v={{ @filemtime(public_path('js/qt3d.js')) }}"></script>
    <script defer src="{{ asset('js/qt.js') }}?v={{ @filemtime(public_path('js/qt.js')) }}"></script>
    @stack('head')
</head>

<body data-page="{{ optional(request()->route())->getName() }}">
    <header class="hdr">
        <div class="container">
            <a href="{{ route('home') }}" class="logo" aria-label="Quantum Tech home"><img class="i"
                    src="{{ asset('images/logo/icon.png') }}" alt="QT"><img class="n"
                    src="{{ asset('images/logo/name.png') }}" alt="Quantum Tech"></a>
            <nav class="nav" aria-label="Primary">
                <a href="{{ route('products.index') }}">Products</a><a href="{{ route('brands.index') }}">Brands</a><a
                    href="{{ route('industries.index') }}">Industries</a><a
                    href="{{ route('solutions.index') }}">Solutions</a><a
                    href="{{ route('resources.index') }}">Resources</a><a href="{{ route('about') }}">Company</a>
            </nav>
            <div class="hact">
                <button class="ibtn" type="button" data-so aria-label="Search"><svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-4-4" />
                    </svg></button>
                <a class="pbtn" href="{{ route('rfq.create') }}">Request quote</a>
                <button class="ibtn mt" type="button" aria-label="Menu"
                    aria-expanded="false"><span><i></i><i></i></span></button>
            </div>
        </div>
    </header>
    <div class="menu" aria-hidden="true" data-lenis-prevent>
        <div class="container">
            <nav>
                <a href="{{ route('products.index') }}"><span>01</span>Products</a><a
                    href="{{ route('brands.index') }}"><span>02</span>Brands</a><a
                    href="{{ route('industries.index') }}"><span>03</span>Industries</a><a
                    href="{{ route('solutions.index') }}"><span>04</span>Solutions</a><a
                    href="{{ route('resources.index') }}"><span>05</span>Resources</a><a
                    href="{{ route('about') }}"><span>06</span>Company</a><a
                    href="{{ route('contact') }}"><span>07</span>Contact</a>
            </nav>
            <div class="mf"><a class="btn" href="{{ route('rfq.create') }}">Request a quote</a><a
                    class="btn outline" href="{{ route('replacement.create') }}">Upload nameplate</a></div>
        </div>
    </div>
    <div class="so" aria-hidden="true">
        <button class="x" type="button" aria-label="Close search">×</button>
        <div class="container"><span class="kick">Search</span>
            <form action="{{ route('search') }}" method="get"><input name="q"
                    placeholder="Products, brands, models…" autocomplete="off" aria-label="Search"><button
                    type="submit">Search ↗</button></form>
            <div class="sg"><span>Try</span><a href="{{ route('search', ['q' => 'gearbox']) }}">Gearbox</a><a
                    href="{{ route('search', ['q' => 'motor']) }}">Electric motor</a><a
                    href="{{ route('search', ['q' => 'VFD']) }}">VFD</a><a
                    href="{{ route('search', ['q' => 'CAD']) }}">CAD</a></div>
        </div>
    </div>
    <main>
        @if (session('success'))
            <div class="container alert">{{ session('success') }}</div>
        @endif
        @yield('content')
    </main>
    <a class="wa" target="_blank" rel="noopener"
        href="https://wa.me/{{ config('quantum.whatsapp') }}?text={{ urlencode('Hello Quantum Tech, I need industrial product assistance.') }}"
        aria-label="Chat on WhatsApp">WhatsApp <span>↗</span></a>
    <footer class="ftr">
        <div class="container">
            <div class="top">
                <h2>Accelerating<br><em>Excellence.</em></h2><a class="btn" href="{{ route('contact') }}">Talk to
                    our team</a>
            </div>
            <div class="fg">
                <div><a class="logo" href="{{ route('home') }}"><img class="i"
                            src="{{ asset('images/logo/icon.png') }}" alt="QT"><img class="n"
                            src="{{ asset('images/logo/name.png') }}" alt="Quantum Tech"></a>
                    <p>Industrial power transmission, motors, drives and engineering solutions for the UAE and GCC.</p>
                </div>
                <div>
                    <h4>Explore</h4><a href="{{ route('products.index') }}">Products</a><a
                        href="{{ route('brands.index') }}">Brands</a><a
                        href="{{ route('industries.index') }}">Industries</a><a
                        href="{{ route('resources.index') }}">Technical resources</a>
                </div>
                <div>
                    <h4>Company</h4><a href="{{ route('about') }}">About</a><a
                        href="{{ route('solutions.index') }}">Engineering solutions</a><a
                        href="{{ route('case-studies.index') }}">Case studies</a><a
                        href="{{ route('blog.index') }}">Knowledge center</a>
                </div>
                <div>
                    <h4>Get in touch</h4>
                    <p>{{ config('quantum.address') }}</p><a
                        href="tel:{{ config('quantum.phone') }}">{{ config('quantum.phone') }}</a><a
                        href="mailto:{{ config('quantum.email') }}">{{ config('quantum.email') }}</a>
                </div>
            </div>
            <div class="fb"><span>© {{ date('Y') }} Quantum Tech. All rights reserved.</span>
                <div><a href="{{ route('privacy') }}">Privacy</a><a href="{{ route('terms') }}">Terms</a></div>
            </div>
        </div>
    </footer>
    <div class="mact"><a href="tel:{{ config('quantum.phone') }}">Call</a><a
            href="https://wa.me/{{ config('quantum.whatsapp') }}">WhatsApp</a><a
            href="{{ route('rfq.create') }}">RFQ</a></div>
</body>

</html>
