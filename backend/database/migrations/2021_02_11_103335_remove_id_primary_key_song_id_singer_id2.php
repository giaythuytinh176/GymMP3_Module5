<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveIdPrimaryKeySongIdSingerId2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('moved_song_singer', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->primary(['song_id', 'singer_id']);
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
