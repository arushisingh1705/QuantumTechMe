<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    protected $guarded = [];
    public function getRenderImageAttribute(): string
    {
        $n = strtolower(($this->name ?? "") . " " . ($this->series ?? "") . " " . ($this->model ?? ""));
        $has = function (array $w) use ($n) {
            foreach ($w as $x) {
                if (str_contains($n, $x)) {
                    return true;
                }
            }
            return false;
        };
        if ($has(["geared motor", "gearmotor", "geared"])) {
            return "geared-motor";
        }
        if ($has(["gearbox", "reducer", "worm", "helical", "planetary"])) {
            return "gearbox";
        }
        if ($has(["vfd", "inverter", "drive", "starter", "automation", "plc", "controller"])) {
            return "drive";
        }
        if ($has(["motor"])) {
            return "motor";
        }
        if ($has(["bearing", "coupling", "chain", "belt"])) {
            return "bearing";
        }
        if ($has(["gear"])) {
            return "gears";
        }
        return "geared-motor";
    }
    protected function casts(): array
    {
        return ["featured" => "boolean", "status" => "boolean"];
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, "category_id");
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy("sort_order");
    }
    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class)->orderBy("attribute_group")->orderBy("sort_order");
    }
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    public function industries()
    {
        return $this->belongsToMany(Industry::class);
    }
    public function applications()
    {
        return $this->belongsToMany(Application::class);
    }
    public function scopePublished(Builder $q): Builder
    {
        return $q->where("status", true);
    }
    public function scopeSearch(Builder $q, ?string $term): Builder
    {
        if (!$term) {
            return $q;
        }
        return $q->where(function ($x) use ($term) {
            $like = "%{$term}%";
            $x->where("name", "like", $like)
                ->orWhere("model", "like", $like)
                ->orWhere("series", "like", $like)
                ->orWhere("sku", "like", $like)
                ->orWhereHas("brand", fn($b) => $b->where("name", "like", $like));
        });
    }
}
