<?php
namespace App\Http\Controllers;use App\Models\CaseStudy;class CaseStudyController extends Controller {public function index(){return view('case-studies.index',['items'=>CaseStudy::with('industry')->where('status',1)->latest()->paginate(12)]);}public function show(CaseStudy $caseStudy){abort_unless($caseStudy->status,404);return view('case-studies.show',compact('caseStudy'));}}
