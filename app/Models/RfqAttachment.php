<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class RfqAttachment extends Model {protected $guarded=[];public function rfq(){return $this->belongsTo(Rfq::class);}}
