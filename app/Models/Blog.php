<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class Blog extends Model {protected $guarded=[];protected function casts():array{return ['featured'=>'boolean','status'=>'boolean','published_at'=>'datetime'];}public function category(){return $this->belongsTo(BlogCategory::class,'category_id');}public function author(){return $this->belongsTo(User::class,'author_id');}}
