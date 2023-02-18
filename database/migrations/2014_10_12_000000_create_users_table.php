<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->char('id', 6)->primary();
            $table->tinyInteger('account_level')->default(1);
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->char('api_token',64)->unique();
            $table->boolean('allow_api_access')->default(1);
            $table->string('login_ip_only')->default(null)->nullable();
            $table->string('api_ip_only')->default(null)->nullable();
            $table->boolean('email_when_login')->default(0);
            $table->boolean('check_uptime_server_index')->default(1);
            $table->boolean('check_uptime_connection_index')->default(1);
            $table->boolean('check_uptime_sftp_connection_index')->default(1);
            $table->boolean('check_uptime_db_connection_index')->default(1);
            $table->boolean('log_connections')->default(0);
            $table->char('download_directory', 8);//8 length string that SFTP downloaded files get stored in
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
