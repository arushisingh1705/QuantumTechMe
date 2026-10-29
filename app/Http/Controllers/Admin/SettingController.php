<?php
namespace App\Http\Controllers\Admin;use App\Http\Controllers\Controller;use App\Models\Setting;use Illuminate\Http\Request;
class SettingController extends Controller {public function index(){return view('admin.settings.index',['settings'=>Setting::orderBy('group')->orderBy('key')->get()]);}public function update(Request $r){foreach($r->input('settings',[]) as $key=>$value)Setting::updateOrCreate(['key'=>$key],['value'=>$value,'group'=>'general','type'=>'text','autoload'=>1]);return back()->with('success','Settings saved.');}}
