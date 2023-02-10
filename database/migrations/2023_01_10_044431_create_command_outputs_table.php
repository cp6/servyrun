<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('command_outputs', function (Blueprint $table) {
            $table->char('id', 12)->primary();
            $table->char('server_id', 8);
            $table->char('user_id', 6);
            $table->char('command_id', 8)->default(null)->nullable();
            $table->char('connection_id', 12)->default(null)->nullable();
            $table->string('the_command');
            $table->text('output');
            $table->boolean('send_email')->default(null)->nullable();
            $table->boolean('is_public')->default(0)->nullable();
            $table->float('seconds_taken')->default(null)->nullable();
            $table->boolean('is_async')->default(0);
            $table->timestamps();
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('command_id')->references('id')->on('commands')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('connection_id')->references('id')->on('connections')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('command_outputs');
    }
};
