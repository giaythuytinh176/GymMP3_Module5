<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'song_id',
        'like',
    ];

    protected $table = 'song_likes';

    public function users()
    {
        $this->belongsTo(User::class, 'user_id');
    }

    public function songs()
    {
        $this->belongsTo(Song::class, 'song_id');
    }
}
