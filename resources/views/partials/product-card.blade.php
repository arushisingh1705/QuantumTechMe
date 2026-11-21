<a class="product-card" href="{{ route('products.show',$p) }}">
    <div class="product-card-top">
        <small>{{ $p->brand?->name ?? 'Quantum Tech' }}</small>
        <span>↗</span>
    </div>
    <div class="product-image">
        @if($p->featured_image)
            <img src="{{ asset('storage/'.$p->featured_image) }}" alt="{{ $p->name }}">
        @else
            <img src="{{ asset('images/products/'.$p->render_image.'.jpg') }}" alt="{{ $p->name }}" loading="lazy" decoding="async">
        @endif
    </div>
    <div class="product-card-body">
        <small>{{ $p->series ?: 'Industrial Series' }}</small>
        <h3>{{ $p->name }}</h3>
        <p>{{ $p->short_description }}</p>
        <b>View specifications</b>
    </div>
</a>
