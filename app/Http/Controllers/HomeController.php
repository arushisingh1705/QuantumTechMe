<?php
namespace App\Http\Controllers;
use App\Models\{Brand,Product,ProductCategory,Industry,Solution,Blog,CaseStudy,Certification};
class HomeController extends Controller {public function index(){return view('home.index',[
'categories'=>ProductCategory::whereNull('parent_id')->where('status',1)->orderBy('display_order')->take(8)->get(),
'products'=>Product::with(['brand','category'])->published()->where('featured',1)->take(8)->get(),
'brands'=>Brand::where('status',1)->where('featured',1)->orderBy('display_order')->take(10)->get(),
'industries'=>Industry::where('status',1)->where('featured',1)->take(8)->get(),
'solutions'=>Solution::where('status',1)->where('featured',1)->take(6)->get(),
'blogs'=>Blog::where('status',1)->latest('published_at')->take(3)->get(),
'caseStudies'=>CaseStudy::where('status',1)->where('featured',1)->take(3)->get(),
'certifications'=>Certification::where('status',1)->take(6)->get(),]);}}
