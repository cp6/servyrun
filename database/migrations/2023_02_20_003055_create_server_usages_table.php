<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('server_usages', function (Blueprint $table) {
            $table->id();
            $table->char('user_id', 6);
            $table->char('server_id', 8);
            $table->float('cpu_usage')->nullable()->default(null);
            $table->float('ram_used_percent')->nullable()->default(null);
            $table->float('disk_used_percent')->nullable()->default(null);
            $table->integer('disk_used')->nullable()->default(null);
            $table->integer('disk_available')->nullable()->default(null);
            $table->integer('uptime')->nullable()->default(null);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');
        });
    }
    public function down()
    {
        Schema::dropIfExists('server_usages');
    }
};
