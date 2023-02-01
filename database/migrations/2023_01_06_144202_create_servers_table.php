<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->char('id', 8)->primary();
            $table->char('user_id', 6);
            $table->unsignedBigInteger('location_id')->default(null)->nullable();
            $table->unsignedBigInteger('type_id')->default(1);
            $table->string('operating_system',125)->default(null)->nullable();
            $table->string('hostname',64);
            $table->string('title',64)->default(null)->nullable();
            $table->string('cpu')->default(null)->nullable();
            $table->integer('cpu_cores')->default(null)->nullable();
            $table->float('cpu_freq')->default(null)->nullable();
            $table->integer('disk_gb')->default(null)->nullable();
            $table->float('disk_tb')->default(null)->nullable();
            $table->integer('ram_mb')->default(null)->nullable();
            $table->float('ram_gb')->default(null)->nullable();
            $table->integer('swap_mb')->default(null)->nullable();
            $table->integer('bandwidth_gb')->default(null)->nullable();
            $table->integer('ping_port')->default(80);
            $table->float('price')->default(null)->nullable();//Not used currently
            $table->float('price_usd')->default(null)->nullable();//Not used currently
            $table->char('currency',3)->default(null)->nullable();//Not used currently
            $table->tinyInteger('payment_term')->default(null)->nullable();//Not used currently
            $table->date('next_due_date')->default(null)->nullable();//Not used currently
            $table->timestamps();
            $table->unique(['user_id','hostname']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('type_id')->references('id')->on('types');
        });
    }

    public function down()
    {
        Schema::dropIfExists('servers');
    }
};
