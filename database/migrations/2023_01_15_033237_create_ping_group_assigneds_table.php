<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ping_group_assigned', function (Blueprint $table) {
            $table->id();
            $table->char('group_id', 8);
            $table->char('server_id', 8);
            $table->char('user_id', 6);
            $table->timestamps();
            $table->unique(['group_id', 'server_id']);
            $table->foreign('group_id')->references('id')->on('ping_groups')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ping_group_assigned');
    }
};
