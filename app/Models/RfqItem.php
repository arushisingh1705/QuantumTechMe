<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; class RfqItem extends Model {protected $guarded=[];public function rfq(){return $this->belongsTo(Rfq::class);}public function product(){return $this->belongsTo(Product::class);}}
