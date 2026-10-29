@extends('layouts.app')
@section('title','Quantum Tech | Industrial Power Transmission UAE & GCC')
@section('content')

{{-- Immersive opening inspired by the cinematic chapter-based interaction of the supplied reference site. --}}
<div class="qt-opening" data-site-intro aria-hidden="true">
    <div class="qt-opening-grid" aria-hidden="true"></div>
    <div class="qt-opening-copy">
        <span>QUANTUM TECH PRESENTS</span>
        <strong>ENGINEERING<br><em>MOTION.</em></strong>
        <small>Dubai · UAE · GCC</small>
    </div>
    <div class="qt-opening-progress"><i></i></div>
    <button type="button" data-intro-skip>Skip opening ↗</button>
</div>

<section class="az-hero" data-hero-slider>
    <div class="az-hero-slides">
        <article class="az-hero-slide is-active" data-hero-slide data-theme="motion">
            <div class="az-hero-media az-media-motion" aria-hidden="true">
                <div class="az-media-grid"></div>
                <div class="az-rotor az-rotor-lg"></div>
                <div class="az-rotor az-rotor-md"></div>
                <div class="az-rotor az-rotor-sm"></div>
                <div class="az-media-label">POWER / TORQUE / RELIABILITY</div>
            </div>
            <div class="container az-hero-content">
                <div class="az-hero-copy">
                    <span class="az-eyebrow">01 / INDUSTRIAL POWER TRANSMISSION · DUBAI UAE</span>
                    <h1><span>Powering industry</span><em>across UAE & GCC.</em></h1>
                    <p>High-performance gearboxes, electric motors, drives and power-transmission solutions backed by professional engineering support.</p>
                    <div class="az-hero-actions">
                        <a href="{{ route('products.index') }}">Explore products <span>↗</span></a>
                        <a href="{{ route('rfq.create') }}">Request a quote <span>↗</span></a>
                    </div>
                </div>
            </div>
        </article>

        <article class="az-hero-slide" data-hero-slide data-theme="engineering">
            <div class="az-hero-media az-media-engineering" aria-hidden="true">
                <div class="az-media-grid"></div>
                <div class="az-blueprint-unit">
                    <span class="bp-a"></span><span class="bp-b"></span><span class="bp-c"></span><span class="bp-axis x"></span><span class="bp-axis y"></span>
                </div>
                <div class="az-media-label">SELECT / SIZE / REPLACE / RETROFIT</div>
            </div>
            <div class="container az-hero-content">
                <div class="az-hero-copy">
                    <span class="az-eyebrow">02 / APPLICATION ENGINEERING</span>
                    <h1><span>More than supply.</span><em>Engineering support.</em></h1>
                    <p>From product selection and sizing to replacements and retrofit support, Quantum Tech helps turn operating requirements into dependable solutions.</p>
                    <div class="az-hero-actions">
                        <a href="{{ route('solutions.index') }}">Engineering solutions <span>↗</span></a>
                        <a href="{{ route('replacement.create') }}">Upload nameplate <span>↗</span></a>
                    </div>
                </div>
            </div>
        </article>

        <article class="az-hero-slide" data-hero-slide data-theme="rfq">
            <div class="az-hero-media az-media-rfq" aria-hidden="true">
                <div class="az-media-grid"></div>
                <div class="az-rfq-card card-one"><b>RFQ</b><span>PRODUCT / PROJECT</span></div>
                <div class="az-rfq-card card-two"><b>CAD</b><span>DRAWINGS / DATA</span></div>
                <div class="az-rfq-card card-three"><b>UAE</b><span>LOCAL RESPONSE</span></div>
                <div class="az-media-label">DISCOVER / VERIFY / ENQUIRE</div>
            </div>
            <div class="container az-hero-content">
                <div class="az-hero-copy">
                    <span class="az-eyebrow">03 / DIGITAL SALES PLATFORM</span>
                    <h1><span>Find it. Verify it.</span><em>Request it.</em></h1>
                    <p>Browse structured technical data, downloadable resources and product information, then move directly into a focused quotation workflow.</p>
                    <div class="az-hero-actions">
                        <a href="{{ route('resources.index') }}">Technical resources <span>↗</span></a>
                        <a href="{{ route('rfq.create') }}">Start RFQ <span>↗</span></a>
                    </div>
                </div>
            </div>
        </article>
    </div>

    <div class="container az-hero-controls">
        <div class="az-hero-count"><strong data-hero-current>01</strong><span>/ 03</span></div>
        <div class="az-hero-progress"><i data-hero-progress></i></div>
        <div class="az-hero-buttons">
            <button type="button" data-hero-prev aria-label="Previous slide">←</button>
            <button type="button" data-hero-next aria-label="Next slide">→</button>
        </div>
        <div class="az-scroll-cue"><span></span>Scroll to explore</div>
    </div>
</section>

<section class="editorial-section intro-section az-reveal-section" data-reveal-section>
    <div class="container section-intro-grid">
        <div class="section-marker"><span>S.01</span><b>About Quantum Tech</b></div>
        <div class="section-copy-large">
            <h2 class="split-reveal">More than a supplier.<br><em>Your engineering partner.</em></h2>
            <p>Quantum Tech connects industrial customers with dependable power-transmission equipment and technical support for selection, replacement, retrofit and demanding applications across the UAE and GCC.</p>
            <a class="text-link" href="{{ route('about') }}">Discover Quantum Tech <span>↗</span></a>
        </div>
    </div>
    <div class="container capability-rail az-stat-rail">
        <div><span data-count-to="01">01</span><p>Regional UAE / GCC focus</p></div>
        <div><span>ENGINEERING</span><p>Application-led support</p></div>
        <div><span>RFQ</span><p>Structured enquiry workflow</p></div>
        <div><span>CAD / DATA</span><p>Technical resource access</p></div>
    </div>
</section>

<section class="editorial-section services-section az-reveal-section" data-reveal-section>
    <div class="container section-intro-grid">
        <div class="section-marker"><span>S.02</span><b>Product categories</b></div>
        <div class="section-copy-large compact-copy">
            <h2 class="split-reveal">Move through the catalogue <em>by application.</em></h2>
            <p>Hover or tap a category to explore the equipment families available for your requirement.</p>
        </div>
    </div>

    <div class="container service-list az-category-list">
        @forelse($categories as $index => $c)
            <a href="{{ route('products.index',['category'=>$c->slug]) }}" class="service-row az-category-row" data-category-row>
                <span class="service-number">{{ str_pad($index + 1,2,'0',STR_PAD_LEFT) }}</span>
                <div class="service-title"><h3>{{ $c->name }}</h3><p>{{ $c->description }}</p></div>
                <div class="az-category-orbit" aria-hidden="true"><i></i><i></i><b>QT</b></div>
                <span class="service-arrow">↗</span>
            </a>
        @empty
            <div class="empty-state">No categories yet. Run the seeders from the README.</div>
        @endforelse
    </div>
</section>

<section class="editorial-section dark-section products-showcase az-reveal-section" data-reveal-section>
    <div class="container section-intro-grid">
        <div class="section-marker light-marker"><span>S.03</span><b>Featured products</b></div>
        <div class="section-copy-large compact-copy">
            <h2 class="split-reveal">A closer look at <em>industrial motion.</em></h2>
            <p>Drag, scroll or use the controls to explore featured products. Each product leads to structured specifications and quotation access.</p>
        </div>
    </div>

    <div class="az-carousel-wrap" data-carousel data-carousel-mode="cards">
        <div class="container az-carousel-meta">
            <div><strong data-carousel-current>01</strong><span>/ {{ str_pad(max(1, $products->count()),2,'0',STR_PAD_LEFT) }}</span></div>
            <div class="az-carousel-progress"><i data-carousel-progress></i></div>
            <div class="az-carousel-controls">
                <button type="button" data-carousel-prev aria-label="Previous products">←</button>
                <button type="button" data-carousel-next aria-label="Next products">→</button>
            </div>
        </div>
        <div class="az-carousel-viewport" data-carousel-viewport>
            <div class="az-carousel-track" data-carousel-track>
                @forelse($products as $p)
                    <div class="az-product-slide" data-carousel-slide>
                        @include('partials.product-card',['p'=>$p])
                    </div>
                @empty
                    <div class="container empty-state">No featured products yet.</div>
                @endforelse
            </div>
        </div>
    </div>
    <div class="container section-footer-link"><a class="text-link light" href="{{ route('products.index') }}">View full product catalogue <span>↗</span></a></div>
</section>

<section class="editorial-section az-perspective-section az-reveal-section" data-reveal-section>
    <div class="container section-intro-grid">
        <div class="section-marker"><span>S.04</span><b>Industry perspective</b></div>
        <div class="section-copy-large compact-copy">
            <h2 class="split-reveal">Different industries.<br><em>One engineering mindset.</em></h2>
            <p>Explore the operating environments Quantum Tech is structured to support.</p>
        </div>
    </div>

    <div class="container az-perspective" data-carousel data-carousel-mode="full">
        <div class="az-perspective-viewport" data-carousel-viewport>
            <div class="az-perspective-track" data-carousel-track>
                @forelse($industries as $index => $i)
                    <article class="az-perspective-slide" data-carousel-slide>
                        <div class="az-perspective-art" data-industry-art="{{ ($index % 4) + 1 }}" aria-hidden="true">
                            <span class="perspective-grid"></span>
                            <span class="perspective-line one"></span>
                            <span class="perspective-line two"></span>
                            <strong>{{ str_pad($index + 1,2,'0',STR_PAD_LEFT) }}</strong>
                        </div>
                        <div class="az-perspective-copy">
                            <span>{{ str_pad($index + 1,2,'0',STR_PAD_LEFT) }} / {{ str_pad(max(1,$industries->count()),2,'0',STR_PAD_LEFT) }}</span>
                            <h3>{{ $i->name }}</h3>
                            <p>{{ $i->short_description }}</p>
                            <a class="text-link" href="{{ route('industries.show',$i) }}">Explore this industry <span>↗</span></a>
                        </div>
                    </article>
                @empty
                    <article class="az-perspective-slide" data-carousel-slide><div class="empty-state">No featured industries yet.</div></article>
                @endforelse
            </div>
        </div>
        <div class="az-perspective-controls">
            <div><strong data-carousel-current>01</strong><span>/ {{ str_pad(max(1,$industries->count()),2,'0',STR_PAD_LEFT) }}</span></div>
            <p>Scroll or drag to discover the next application.</p>
            <div class="az-carousel-controls">
                <button type="button" data-carousel-prev aria-label="Previous industry">←</button>
                <button type="button" data-carousel-next aria-label="Next industry">→</button>
            </div>
        </div>
    </div>
</section>

<section class="editorial-section engineering-section az-reveal-section" data-reveal-section>
    <div class="container engineering-grid">
        <div class="engineering-visual az-parallax-stage" data-parallax-stage aria-hidden="true">
            <div class="engineering-grid-art"></div>
            <div class="engineering-label">ENGINEERING<br>SUPPORT</div>
            <div class="az-floating-spec spec-a"><small>TORQUE</small><b>Nm</b></div>
            <div class="az-floating-spec spec-b"><small>RATIO</small><b>i</b></div>
            <div class="az-floating-spec spec-c"><small>POWER</small><b>kW</b></div>
        </div>
        <div>
            <div class="section-marker"><span>S.05</span><b>Engineering solutions</b></div>
            <div class="section-copy-large compact-copy">
                <h2 class="split-reveal">From selection to <em>replacement & retrofit.</em></h2>
            </div>
            <div class="engineering-list">
                @foreach($solutions as $index => $s)
                    <a href="{{ route('solutions.show',$s) }}">
                        <span>{{ str_pad($index + 1,2,'0',STR_PAD_LEFT) }}</span>
                        <div><b>{{ $s->name }}</b><small>{{ $s->short_description }}</small></div>
                        <i>↗</i>
                    </a>
                @endforeach
            </div>
            <a class="text-link" href="{{ route('solutions.index') }}">Explore all engineering solutions <span>↗</span></a>
        </div>
    </div>
</section>

<section class="editorial-section brands-section az-reveal-section" data-reveal-section>
    <div class="container section-intro-grid">
        <div class="section-marker"><span>S.06</span><b>Partner brands</b></div>
        <div class="section-copy-large compact-copy">
            <h2 class="split-reveal">Technology from <em>trusted manufacturers.</em></h2>
        </div>
    </div>
    <div class="brand-marquee-wrap">
        <div class="brand-marquee az-interactive-marquee">
            @foreach($brands as $b)
                <a href="{{ route('brands.show',$b) }}"><strong>{{ $b->name }}</strong><small>{{ $b->country }}</small></a>
            @endforeach
            @foreach($brands as $b)
                <a href="{{ route('brands.show',$b) }}" aria-hidden="true" tabindex="-1"><strong>{{ $b->name }}</strong><small>{{ $b->country }}</small></a>
            @endforeach
        </div>
    </div>
</section>

<section class="replacement-band az-reveal-section" data-reveal-section>
    <div class="replacement-noise" aria-hidden="true"></div>
    <div class="container replacement-grid">
        <div>
            <span class="section-kicker light-kicker">Replacement / Nameplate</span>
            <h2>Need a replacement gearbox or motor?</h2>
        </div>
        <p>Upload a photo of the existing equipment nameplate and share the available operating details. Our team can review the requirement and help identify a suitable replacement.</p>
        <a class="round-link orange-link az-pulse-link" href="{{ route('replacement.create') }}">Upload<br>Nameplate <span>↗</span></a>
    </div>
</section>

<section class="final-cta az-reveal-section" data-reveal-section>
    <div class="az-cta-orbit" aria-hidden="true"><span></span><span></span><i>QT</i></div>
    <div class="container final-cta-inner">
        <span class="section-marker"><span>S.07</span><b>Start a project</b></span>
        <h2 class="split-reveal">Tell us what you need.<br><em>We’ll help you specify it.</em></h2>
        <div class="final-cta-actions">
            <a href="{{ route('rfq.create') }}">Request a Quote <span>↗</span></a>
            <a href="{{ route('contact') }}">Talk to our team <span>↗</span></a>
        </div>
    </div>
</section>
@endsection
