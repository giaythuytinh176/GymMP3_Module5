<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkpkSongSingerToSongsinger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('song_singer', function (Blueprint $table) {
            $table->foreign('song_id')->references('id')->on('songs')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('singer_id')->references('id')->on('singers')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('song_singer', function (Blueprint $table) {
            //
        });
    }
}
