<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Singer extends Model
{
    use HasFactory;

    protected $fillable = [
        'singer_name',
        'image',
        'gender',
        'date_of_birth',
        'music_genre',
        'story',
        'band',
        'description',
    ];

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'song_singer', 'singer_id', 'song_id');
    }

    public function movedSongs()
    {
        return $this->belongsToMany(MovedSong::class, 'song_singer', 'singer_id', 'song_id');
    }
}
