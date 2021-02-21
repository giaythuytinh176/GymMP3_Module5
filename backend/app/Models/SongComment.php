<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongComment extends Model
{
    use HasFactory;
    protected $table = 'song_comments';

    protected $fillable = [
        'name',
        'email',
        'content',
        'song_id',
    ];

    public function songs()
    {
        return $this->belongsTo(Song::class, 'song_id');
    }
}
