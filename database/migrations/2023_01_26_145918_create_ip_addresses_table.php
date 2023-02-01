<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ip_addresses', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->char('server_id', 8)->default(null)->nullable();
            $table->string('ip');
            $table->boolean('is_ipv4');
            $table->boolean('is_main')->default(null)->nullable();
            $table->boolean('is_ssh')->default(null)->nullable();
            $table->string('asn')->default(null)->nullable();
            $table->string('org')->default(null)->nullable();
            $table->string('isp')->default(null)->nullable();
            $table->string('timezone_gmt')->default(null)->nullable();
            $table->string('country')->default(null)->nullable();
            $table->string('city')->default(null)->nullable();
            $table->string('continent')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'ip']);
            $table->unique(['server_id', 'ip']);
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ip_addresses');
    }
};
