<?php
namespace Database\Seeders;use App\Models\User;use Illuminate\Database\Seeder;use Illuminate\Support\Facades\Hash;
class AdminUserSeeder extends Seeder {public function run():void{User::updateOrCreate(['email'=>'admin@quantumtech.ae'],['name'=>'Quantum Tech Admin','phone'=>'+971000000000','role'=>'super_admin','is_active'=>1,'password'=>Hash::make('ChangeMe@123')]);}}
