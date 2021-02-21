<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\SongLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SongLikeController extends Controller
{
    public function index()
    {
        //
    }

    public function storeLike(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'song_id' => 'required|integer|exists:songs,id',
            'likedislike' => 'required|string|in:like,dislike',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $likedislike = $request->likedislike;
        if ($likedislike == 'like') {
            $data = DB::table('song_likes')
                ->where([
                    'user_id' => $request->user_id,
                    'song_id' => $request->song_id,
                    'like' => 1,
                ])
                ->first();
        } else {
            $data = DB::table('song_likes')
                ->where([
                    'user_id' => $request->user_id,
                    'song_id' => $request->song_id,
                    'like' => 0,
                ])
                ->first();
        }
        if ($data === null) {
            $dt = [
                'user_id' => $request->user_id,
                'song_id' => $request->song_id,
                'like' => $likedislike == 'dislike' ? 0 : 1,
            ];
            $songLike = DB::table('song_likes')->insert($dt);
            return response()->json($songLike, 200);
        } else {
            if ($data->like == 1 && $likedislike == 'like') {
                $update = DB::table('song_likes')
                    ->where('id', $data->id)
                    ->delete();
                return response()->json($update, 200);
            } elseif ($data->like == 0 && $likedislike == 'dislike') {
                $update = DB::table('song_likes')
                    ->where('id', $data->id)
                    ->delete();
                return response()->json($update, 200);
            } else {
                return response()->json('Something wrong.', 400);
            }
        }
    }

    public function show(SongLike $songLike)
    {
        //
    }

    public function update(Request $request, SongLike $songLike)
    {
        //
    }

    public function destroy(SongLike $songLike)
    {
        //
    }
}
