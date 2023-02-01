<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('keys', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('file_id', 32)->unique();
            $table->char('user_id', 6);
            $table->string('password')->default(null)->nullable();
            $table->string('original_name');
            $table->string('saved_as');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('keys');
    }
};
