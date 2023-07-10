<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        /*Schema::create('ip_addresses_assigned', function (Blueprint $table) {
           table->id();
           $table->char('ip_id', 8);
           $table->char('server_id', 8);
           $table->char('user_id', 6);
           $table->boolean('is_ssh_ip')->default(0);
           $table->timestamps();
           $table->unique(['ip_id', 'server_id']);
           $table->foreign('ip_id')->references('id')->on('ip_addresses')->onDelete('cascade')->onUpdate('cascade');
           $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade')->onUpdate('cascade');
       });*/
    }

    public function down()
    {
        Schema::dropIfExists('ip_addresses_assigned');
    }
};
