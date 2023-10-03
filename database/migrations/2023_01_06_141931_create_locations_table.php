<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->char('user_id')->nullable()->default(null);
            $table->string('name')->unique();
            $table->string('country')->default(null)->nullable();
            $table->float('lat')->default(null)->nullable();
            $table->float('lon')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'name']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
