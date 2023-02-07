<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('command_group_assigned', function (Blueprint $table) {
            $table->id();
            $table->char('group_id', 8);
            $table->char('user_id', 6);
            $table->char('server_id', 8);
            $table->char('connection_id', 12);
            $table->timestamps();
            $table->foreign('group_id')->references('id')->on('command_groups')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');
            $table->foreign('connection_id')->references('id')->on('connections')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('command_group_assigned');
    }
};
