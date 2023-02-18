<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('downloaded_files', function (Blueprint $table) {
            $table->char('id', 8);
            $table->char('user_id', 6);
            $table->char('sftp_connection_id', 8);
            $table->string('filename');
            $table->string('from_dir')->nullable();
            $table->string('to_dir');
            $table->string('saved_as');
            $table->integer('size')->nullable();
            $table->float('speed_mbps')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('sftp_connection_id')->references('id')->on('sftp_connections')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('downloaded_files');
    }
};
