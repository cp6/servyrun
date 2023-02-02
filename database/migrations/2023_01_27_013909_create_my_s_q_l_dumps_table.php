<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('mysql_dumps', function (Blueprint $table) {
            $table->char('id', 8);
            $table->char('connection_id', 12);
            $table->char('server_id', 8);
            $table->char('database_id', 8);
            $table->char('db_connection_id', 8);
            $table->char('user_id', 6);
            $table->string('these_tables')->default(null)->nullable();
            $table->string('save_to')->default('')->nullable();
            $table->string('save_as');
            $table->boolean('compress')->default(0);
            $table->tinyInteger('option')->default(0);
            $table->string('flags')->default(null)->nullable();
            $table->dateTime('last_ran')->default(null)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'database_id', 'these_tables', 'save_as']);
            $table->foreign('connection_id')->references('id')->on('connections')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('db_connection_id')->references('id')->on('database_connections')->onDelete('cascade');
            $table->foreign('database_id')->references('id')->on('databases')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mysql_dumps');
    }
};
