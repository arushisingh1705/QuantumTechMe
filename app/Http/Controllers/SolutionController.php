<?php
namespace App\Http\Controllers;use App\Models\Solution;class SolutionController extends Controller {public function index(){return view('solutions.index',['solutions'=>Solution::where('status',1)->get()]);}public function show(Solution $solution){abort_unless($solution->status,404);return view('solutions.show',compact('solution'));}}
