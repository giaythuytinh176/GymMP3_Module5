<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_playlist',
        'description',
        'user_id',
        'view',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    function songs(){
        return $this->belongsToMany(Song::class, 'song_playlist', 'playlist_id', 'song_id');
    }
}
