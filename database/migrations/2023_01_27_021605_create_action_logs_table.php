<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('action_logs', function (Blueprint $table) {
            $table->id();
            $table->char('user_id', 6);
            $table->char('server_id', 8)->default(null)->nullable();
            $table->char('connection_id', 12)->default(null)->nullable();
            $table->char('database_id', 8)->default(null)->nullable();
            $table->char('command_id', 8)->default(null)->nullable();
            $table->tinyInteger('result');//1 = success, 2 = info, 3 = warning, 5 = error, 6 = fail
            $table->string('resource_type')->default(null)->nullable();
            $table->string('action')->default(null)->nullable();
            $table->string('message')->default(null)->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('connection_id')->references('id')->on('connections')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('database_id')->references('id')->on('databases')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('command_id')->references('id')->on('commands')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('action_logs');
    }
};
