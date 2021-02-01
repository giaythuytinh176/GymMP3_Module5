<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    protected $fillable = [
        'album_name',
        'image'
      ];

    public function Song(){
        return $this->hasMany(Song::class,'album_id');
    }
}
