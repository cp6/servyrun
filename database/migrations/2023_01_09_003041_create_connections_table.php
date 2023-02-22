<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('connections', function (Blueprint $table) {
            $table->char('id', 12)->primary();
            $table->char('server_id', 8);
            $table->char('user_id', 6);
            $table->tinyInteger('type');//1 password, 2 key password, 3 key
            $table->string('username', 64);
            $table->integer('ssh_port')->default(22);
            $table->char('key_id', 8)->default(null)->nullable();
            $table->string('password', 400)->default(null)->nullable();
            $table->boolean('submit_password')->default(null)->nullable();
            $table->boolean('sudo')->default(null)->nullable();
            $table->dateTime('last_used')->default(null)->nullable();
            $table->tinyInteger('status')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'server_id', 'username', 'type']);
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('key_id')->references('id')->on('keys')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('connections');
    }
};
