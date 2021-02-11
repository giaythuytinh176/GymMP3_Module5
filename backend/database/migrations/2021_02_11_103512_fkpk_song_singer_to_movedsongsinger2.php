<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkpkSongSingerToMovedsongsinger2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('moved_song_singer', function (Blueprint $table) {
            $table->foreign('song_id')->references('id')->on('moved_songs')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::table('moved_song_singer', function (Blueprint $table) {
            //
        });
    }
}
