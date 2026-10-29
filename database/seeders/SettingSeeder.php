<?php
namespace Database\Seeders;use App\Models\Setting;use Illuminate\Database\Seeder;
class SettingSeeder extends Seeder {public function run():void{foreach(['company_name'=>'Quantum Tech','tagline'=>'Powering Industry Across the UAE & GCC','phone'=>'+971000000000','whatsapp'=>'971000000000','email'=>'sales@quantumtech.ae','address'=>'Dubai, United Arab Emirates'] as $k=>$v)Setting::updateOrCreate(['key'=>$k],['group'=>'general','value'=>$v,'type'=>'text','autoload'=>1]);}}
