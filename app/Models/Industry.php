<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class Industry extends Model {protected $guarded=[];protected function casts():array{return ['featured'=>'boolean','status'=>'boolean'];}public function products(){return $this->belongsToMany(Product::class);}public function documents(){return $this->hasMany(Document::class);} }
