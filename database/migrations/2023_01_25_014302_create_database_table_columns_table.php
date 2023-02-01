<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('database_table_columns', function (Blueprint $table) {
            $table->id();
            $table->char('user_id', 6);
            $table->char('table_id', 8);
            $table->string('name');
            $table->string('type');
            $table->boolean('is_nullable');
            $table->string('key')->default(null)->nullable();
            $table->string('default')->default(null)->nullable();
            $table->string('extra')->default(null)->nullable();
            $table->string('comment')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'table_id', 'name']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('table_id')->references('id')->on('database_tables')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('database_table_columns');
    }
};
