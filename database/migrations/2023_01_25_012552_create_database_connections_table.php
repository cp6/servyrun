<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('database_connections', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->char('server_id', 8)->default(null)->nullable();
            $table->string('host')->default(null)->nullable();
            $table->string('title');
            $table->integer('port')->default(3306);
            $table->string('username');
            $table->string('password')->default(null)->nullable();
            $table->tinyInteger('type')->default(1);//1  = MySQL
            $table->string('version')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'host', 'username']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('database_connections');
    }
};
