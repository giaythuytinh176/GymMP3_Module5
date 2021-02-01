<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'nameSong',
        'avatarUrl',
        'mp3Url',
        'describes',
        'author',
        'views',
        'user_id',
        'singer_id',
        'category_id',
        'album_id',
    ];

    use HasFactory;
}
