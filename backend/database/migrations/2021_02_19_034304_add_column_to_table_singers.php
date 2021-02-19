<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToTableSingers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('singers', function (Blueprint $table) {
            $table->string('gender')->nullable();
            $table->integer('date_of_birth')->nullable();
            $table->string('music_genre')->nullable();
            $table->string('story')->nullable();
            $table->string('year_of_birth')->nullable();
            $table->string('band')->nullable();
            $table->string('popular_song')->nullable();
            $table->string('information')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('singers', function (Blueprint $table) {
            //
        });
    }
}
