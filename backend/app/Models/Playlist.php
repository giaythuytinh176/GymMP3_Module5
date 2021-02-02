<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_playlist',
        'category_name',
        'description',
        'current_number_songs',
        'create_day',
        'user_id',
        'last_update',
        'view',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
