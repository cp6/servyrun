<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('database_tables', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->char('database_id', 8);
            $table->string('name');
            $table->integer('row_count')->default(null)->nullable();
            $table->float('size_mb')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'database_id', 'name']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('database_id')->references('id')->on('databases')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('database_tables');
    }
};
