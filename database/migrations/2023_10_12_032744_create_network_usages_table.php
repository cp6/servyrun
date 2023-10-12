<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('network_usages', function (Blueprint $table) {
            $table->id();
            $table->char('user_id', 6);
            $table->char('server_id', 8);
            $table->integer('rx');
            $table->integer('tx');
            $table->integer('total');
            $table->integer('total_mb');
            $table->float('rx_mb')->nullable()->default(null);
            $table->float('tx_mb')->nullable()->default(null);
            $table->dateTime('datetime');
            $table->timestamps();
            $table->unique(['server_id', 'datetime']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('server_id')->references('id')->on('servers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('network_usages');
    }
};
