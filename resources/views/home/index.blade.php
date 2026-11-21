@extends('layouts.app')
@section('title', 'Quantum Tech | Industrial Power Transmission UAE & GCC')
@section('content')
    <section class="hero">
        <div class="container">
            <div>
                <span class="eyebrow">Dubai · UAE &amp; GCC</span>
                <h1>Accelerating <em>Excellence.</em></h1>
                <p>High-performance gearboxes, electric motors, drives and power-transmission solutions, backed by
                    professional engineering support.</p>
                <div class="actions"><a class="btn" href="{{ route('products.index') }}">Explore products</a><a
                        class="btn outline" href="{{ route('rfq.create') }}">Request a quote</a></div>
                <div class="pills"><span>Gearboxes</span><span>Geared motors</span><span>Electric
                        motors</span><span>Drives</span><span>Automation</span><span>Pumps</span><span>Couplings</span>
                </div>
            </div>
            <div class="vox"><canvas data-3d="voxel" aria-label="3D Quantum Tech logo"></canvas>
                <div class="tag">QT · BUILT BLOCK BY BLOCK</div>
            </div>
        </div>
        <div class="scrollcue" aria-hidden="true"></div>
    </section>
    <div class="kin" aria-hidden="true">
        <div>
            @for ($k = 0; $k < 2; $k++)
                <span>Gearboxes</span><span>Motors</span><span>Drives</span><span>Automation</span><span>Pumps</span><span>Couplings</span>
            @endfor
        </div>
    </div>
    @if ($brands->count())
        <div class="marq" aria-label="Partner brands">
            <div>
                @foreach ($brands as $b)
                    <a href="{{ route('brands.show', $b) }}">{{ $b->name }}</a>
                    @endforeach @foreach ($brands as $b)
                        <a href="{{ route('brands.show', $b) }}" aria-hidden="true" tabindex="-1">{{ $b->name }}</a>
                    @endforeach
            </div>
        </div>
    @endif

    <section class="section">
        <div class="container">
            <span class="kick">01 · About</span>
            <div class="bento">
                <div class="b w2 h2 hl"><span class="pxs"><i></i><i></i><i></i></span>
                    <h3 style="font-size:clamp(1.7rem,3.2vw,2.6rem);line-height:1.08;letter-spacing:-.03em">More than a
                        supplier. Your engineering partner.</h3>
                    <p style="font-size:1.05rem;max-width:44ch">Quantum Tech connects industrial customers with dependable
                        power-transmission equipment and technical support for selection, replacement, retrofit and
                        demanding applications across the UAE and GCC.</p><a class="tl" href="{{ route('about') }}"
                        style="border-color:#0b0c0e;color:#0b0c0e;align-self:flex-start">Discover Quantum Tech ↗</a>
                </div>
                <div class="b"><span class="num">UAE/GCC</span>
                    <p>Regional focus</p><span class="mono">Dubai based</span>
                </div>
                <div class="b"><span class="num">ENG</span>
                    <p>Application-led engineering support</p><span class="mono">Selection · Sizing</span>
                </div>
                <div class="b"><span class="num">RFQ</span>
                    <p>Structured enquiry workflow</p><span class="mono">Quote ready</span>
                </div>
                <div class="b"><span class="num">CAD</span>
                    <p>Technical data and resource access</p><span class="mono">Datasheets · Manuals</span>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="sh"><span class="kick">02 · In practice</span>
                <div>
                    <h2>Engineering you can <em>see and trust.</em></h2>
                    <p>Precision components, hands-on engineering support and organised technical data, working together.
                    </p>
                </div>
            </div>
            <div class="gal">
                <div class="gp g1">
                    <div class="gi" data-par style="background-image:var(--img-a)"></div>
                    <div class="gc"><small>Power transmission</small>
                        <h3>Precision in every connection</h3>
                    </div>
                </div>
                <div class="gp g2">
                    <div class="gi" data-par style="background-image:var(--img-b)"></div>
                    <div class="gc"><small>Engineering support</small>
                        <h3>People who solve problems</h3>
                    </div>
                </div>
                <div class="gp g3">
                    <div class="gi" data-par style="background-image:var(--img-c)"></div>
                    <div class="gc"><small>Technical resources</small>
                        <h3>Data at your fingertips</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section muted fam-sec">
        <div class="container">
            <div class="sh"><span class="kick">03 · Product families</span>
                <div>
                    <h2>Move through the catalogue <em>by application.</em></h2>
                    <p>Hover a family to watch its shape take form, then open it to browse the range.</p>
                </div>
            </div>
            <div class="fam-wrap">
                <div>
                    @forelse($categories as $index => $c)
                        <a class="fam" href="{{ route('products.index', ['category' => $c->slug]) }}"
                            data-category-row><span class="nn">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</span>
                            <div>
                                <h3>{{ $c->name }}</h3>
                                <p>{{ $c->description }}</p>
                            </div><i>↗</i>
                        </a>
                    @empty<div class="empty-state">No categories yet. Run the seeders from the README.</div>
                    @endforelse
                </div>
                <canvas class="qt3d-morph" aria-hidden="true"></canvas>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="sh"><span class="kick">04 · Featured</span>
                <div>
                    <h2>A closer look at <em>industrial motion.</em></h2>
                    <p>Drag or use the arrows to browse featured products. Each leads to structured specifications and
                        quotation.</p>
                    <div class="rctl" style="margin-top:28px"><button type="button" data-rail-prev
                            aria-label="Previous">←</button><button type="button" data-rail-next
                            aria-label="Next">→</button></div>
                </div>
            </div>
        </div>
        <div class="rail" data-rail>
            @forelse($products as $p)
                @include('partials.product-card', ['p' => $p])@empty<div class="container empty-state">No featured products yet.</div>
            @endforelse
        </div>
        <div class="container"><a class="tl" href="{{ route('products.index') }}">View the full catalogue ↗</a></div>
    </section>

    <section class="section muted">
        <div class="container">
            <div class="sh"><span class="kick">05 · Industries</span>
                <div>
                    <h2>Different industries. <em>One engineering mindset.</em></h2>
                    <p>The operating environments Quantum Tech is structured to support.</p>
                </div>
            </div>
            <div class="ind-grid">
                @forelse($industries as $index => $i)
                    <a class="ind"
                        href="{{ route('industries.show', $i) }}"><strong>{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</strong>
                        <h3>{{ $i->name }}</h3>
                        <p>{{ $i->short_description }}</p><span>Explore ↗</span>
                    </a>
                @empty<div class="empty-state">No featured industries yet.</div>
                @endforelse
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container reach">
            <div><span class="kick">06 · Regional reach</span>
                <h2 class="big">Dubai based.<br><em>GCC wide.</em></h2>
                <p style="color:#9aa1aa;margin-top:24px;max-width:50ch;font-size:1.1rem">From Dubai, Quantum Tech supports
                    industrial customers across the UAE and the wider GCC with product supply, application engineering and
                    responsive technical support.</p>
                <div class="chips"><span>UAE</span><span>Saudi
                        Arabia</span><span>Qatar</span><span>Oman</span><span>Kuwait</span><span>Bahrain</span></div>
            </div>
            <div class="qt3d-globe-box"><canvas data-3d="globe"
                    aria-label="Interactive 3D globe of the UAE and GCC"></canvas><span class="qt3d-hint">DRAG TO
                    ROTATE</span></div>
        </div>
    </section>

    <section class="section muted">
        <div class="container">
            <div class="sh"><span class="kick">07 · How we help</span>
                <div>
                    <h2>From first enquiry to <em>dependable operation.</em></h2>
                </div>
            </div>
            <div class="steps" data-steps>
                <div class="step"><i></i><b>01</b>
                    <h3>Select</h3>
                    <p>Find the right gearbox, motor or drive from structured technical data.</p>
                </div>
                <div class="step"><i></i><b>02</b>
                    <h3>Size</h3>
                    <p>Match torque, ratio and power to your operating requirement.</p>
                </div>
                <div class="step"><i></i><b>03</b>
                    <h3>Replace</h3>
                    <p>Upload a nameplate and identify a suitable replacement.</p>
                </div>
                <div class="step"><i></i><b>04</b>
                    <h3>Retrofit</h3>
                    <p>Engineering support for upgrades and demanding applications.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container eng">
            <div class="eng-vis"><canvas class="qt3d-fill" data-3d="gearbox" aria-hidden="true"></canvas></div>
            <div><span class="kick">08 · Engineering solutions</span>
                <h2 class="big">From selection to <em>replacement &amp; retrofit.</em></h2>
                <div class="eng-list" style="margin-top:36px">
                    @foreach ($solutions as $index => $s)
                        <a href="{{ route('solutions.show', $s) }}"><span>{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</span>
                            <div><b>{{ $s->name }}</b><small>{{ $s->short_description }}</small></div><i
                                style="font-style:normal">↗</i>
                        </a>
                    @endforeach
                </div>
                <a class="tl" href="{{ route('solutions.index') }}">All engineering solutions ↗</a>
            </div>
        </div>
    </section>

    @if ($brands->count() > 2)
        <section class="section muted center">
            <div class="container"><span class="kick">09 · Partner brands</span>
                <h2 class="big">Technology from <em>trusted manufacturers.</em></h2>
                <div class="qt3d-sphere" aria-label="Partner brands">
                    @foreach ($brands as $b)
                        <a href="{{ route('brands.show', $b) }}">{{ $b->name }}</a>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    @if ($caseStudies->count() || $blogs->count())
        <section class="section">
            <div class="container">
                <div class="sh"><span class="kick">10 · Insights</span>
                    <div>
                        <h2>Engineering stories <em>and know-how.</em></h2>
                    </div>
                </div>
                <div class="insights">
                    @foreach ($caseStudies as $x)
                        <a class="card" href="{{ route('case-studies.show', $x) }}"><small>Case study ·
                                {{ $x->industry?->name }}</small>
                            <h3>{{ $x->title }}</h3>
                            <p>{{ \Illuminate\Support\Str::limit($x->problem, 110) }}</p><span>Read ↗</span>
                        </a>
                    @endforeach
                    @foreach ($blogs as $p)
                        <a class="card" href="{{ route('blog.show', $p) }}"><small>Article ·
                                {{ optional($p->published_at)->format('d M Y') }}</small>
                            <h3>{{ $p->title }}</h3>
                            <p>{{ \Illuminate\Support\Str::limit($p->excerpt, 110) }}</p><span>Read ↗</span>
                        </a>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    <section class="replacement-band">
        <div class="container">
            <div><span class="kick">Replacement / Nameplate</span>
                <h2>Need a replacement gearbox or motor?</h2>
            </div>
            <p>Upload a photo of the existing nameplate and share what you know. Our team will review the requirement and
                help identify a suitable replacement.</p>
            <a class="ring-link" href="{{ route('replacement.create') }}">Upload<br>nameplate ↗</a>
        </div>
    </section>

    <section class="final-cta">
        <div class="container">
            <span class="kick">Start a project</span>
            <h2>Tell us what you need.<br>We’ll help you specify it.</h2>
            <a class="btn" href="{{ route('rfq.create') }}">Request a quote</a><a class="btn outline"
                href="{{ route('contact') }}">Talk to our team</a>
        </div>
    </section>
@endsection
