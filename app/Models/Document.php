<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class Document extends Model {protected $guarded=[];protected function casts():array{return ['status'=>'boolean'];}public function product(){return $this->belongsTo(Product::class);}public function brand(){return $this->belongsTo(Brand::class);}public function industry(){return $this->belongsTo(Industry::class);}}
