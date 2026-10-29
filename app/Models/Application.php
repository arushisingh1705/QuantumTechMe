<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class Application extends Model {protected $guarded=[];protected function casts():array{return ['status'=>'boolean'];}public function products(){return $this->belongsToMany(Product::class);} }
