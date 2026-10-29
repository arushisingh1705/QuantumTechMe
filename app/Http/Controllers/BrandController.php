<?php
namespace App\Http\Controllers;use App\Models\Brand;use Illuminate\Http\Request;
class BrandController extends Controller {public function index(Request $r){$q=Brand::where('status',1);if($r->q)$q->where('name','like','%'.$r->q.'%');return view('brands.index',['brands'=>$q->orderBy('display_order')->paginate(18)]);}public function show(Brand $brand){abort_unless($brand->status,404);$brand->load(['products'=>fn($q)=>$q->published(),'documents'=>fn($q)=>$q->where('status',1)]);return view('brands.show',compact('brand'));}}
