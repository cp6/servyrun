<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('databases', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('db_connection_id', 8);
            $table->char('user_id', 6);
            $table->string('name');
            $table->timestamps();
            $table->unique(['user_id', 'db_connection_id', 'name']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('db_connection_id')->references('id')->on('database_connections')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('databases');
    }
};
