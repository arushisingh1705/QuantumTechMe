<?php
use Illuminate\Database\Migrations\Migration;use Illuminate\Database\Schema\Blueprint;use Illuminate\Support\Facades\Schema;
return new class extends Migration {public function up():void{
 Schema::create('settings',function(Blueprint $t){$t->id();$t->string('group')->default('general');$t->string('key')->unique();$t->longText('value')->nullable();$t->string('type')->default('text');$t->boolean('autoload')->default(true);$t->timestamps();});
 Schema::create('activity_logs',function(Blueprint $t){$t->id();$t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();$t->string('action');$t->string('subject_type')->nullable();$t->unsignedBigInteger('subject_id')->nullable();$t->json('metadata')->nullable();$t->string('ip_address',45)->nullable();$t->timestamps();$t->index(['subject_type','subject_id']);});
 Schema::create('analytics_events',function(Blueprint $t){$t->id();$t->string('event_type')->index();$t->string('entity_type')->nullable();$t->unsignedBigInteger('entity_id')->nullable();$t->string('session_id')->nullable();$t->string('url')->nullable();$t->string('referrer')->nullable();$t->json('metadata')->nullable();$t->timestamps();$t->index(['entity_type','entity_id']);});
 } public function down():void{Schema::dropIfExists('analytics_events');Schema::dropIfExists('activity_logs');Schema::dropIfExists('settings');}};
