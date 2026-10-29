<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class CaseStudy extends Model {protected $guarded=[];protected function casts():array{return ['featured'=>'boolean','status'=>'boolean'];}public function industry(){return $this->belongsTo(Industry::class);}}
