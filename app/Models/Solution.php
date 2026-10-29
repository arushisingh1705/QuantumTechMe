<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class Solution extends Model {protected $guarded=[];protected function casts():array{return ['featured'=>'boolean','status'=>'boolean'];}}
