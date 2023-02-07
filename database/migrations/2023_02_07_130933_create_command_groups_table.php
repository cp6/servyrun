<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('command_groups', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->char('command_id', 8);
            $table->string('title')->default(null)->nullable();
            $table->integer('server_count')->default(null)->nullable();
            $table->boolean('email_output')->default(1);
            $table->integer('timeout')->default(10);
            $table->timestamps();
            $table->foreign('command_id')->references('id')->on('commands')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('command_groups');
    }
};
