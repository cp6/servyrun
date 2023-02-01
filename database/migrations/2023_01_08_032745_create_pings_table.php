<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pings', function (Blueprint $table) {
            $table->id();
            $table->char('user_id', '6');
            $table->char('server_id', '8');
            $table->char('from_server_id', '8')->default(null)->nullable();
            $table->char('ping_group', '8')->default(null)->nullable();
            $table->boolean('was_up');
            $table->float('avg')->default(null)->nullable();
            $table->float('min')->default(null)->nullable();
            $table->float('max')->default(null)->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('from_server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pings');
    }
};
