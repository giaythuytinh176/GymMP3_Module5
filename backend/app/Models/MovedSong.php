<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovedSong extends Model
{
    protected $table = 'moved_songs';
    protected $fillable = [
        'nameSong',
        'avatarUrl',
        'mp3Url',
        'describes',
        'author',
        'views',
        'user_id',
        'category_id',
        'album_id',
    ];

    use HasFactory;

    public function Album()
    {
        return $this->belongsTo(Album::class, 'album_id');
    }

    public function Category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function singers()
    {
        return $this->belongsToMany(Singer::class, 'moved_song_singer', 'song_id', 'singer_id');
    }
}
