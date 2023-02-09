<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('commands', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->string('title',32)->default(null)->nullable();
            $table->string('command');
            $table->boolean('is_async')->default(0);
            $table->dateTime('last_used')->default(null)->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('commands');
    }
};
