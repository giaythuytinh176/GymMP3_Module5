<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('nameSong');
            $table->string('avatarUrl');
            $table->string('mp3Url');
            $table->longText('describes');
            $table->longText('author');
            $table->integer('views');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('singer_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('album_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
}
