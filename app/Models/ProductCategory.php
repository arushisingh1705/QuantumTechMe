<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class ProductCategory extends Model {protected $guarded=[];protected function casts():array{return ['featured'=>'boolean','status'=>'boolean'];}public function parent(){return $this->belongsTo(self::class,'parent_id');}public function children(){return $this->hasMany(self::class,'parent_id')->orderBy('display_order');}public function products(){return $this->hasMany(Product::class,'category_id');}}
