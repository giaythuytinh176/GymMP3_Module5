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

    public function getTopLikes()
    {
        $data = DB::table('song_likes')
            ->select(DB::raw('count(*) as like_count, song_id'))
            ->where('like', 1)
            ->groupBy('song_id')
            ->orderByDesc('like_count')
            ->limit(5)
            ->get()
            ->toArray();
        $data = json_decode(json_encode($data), true);

        $listSongs = [];
        foreach ($data as $datum) {
            $listSongs[] = $this->getSongInfo($datum['song_id']);

        }
        return response()->json($listSongs, 200);
    }

    public function getSongInfo($id)
    {
        $data = Song::with('singers')->where('id', $id)->first()->toArray();
        return $data;
    }

    public function getLikeDisLike(Request $request, $id)
    {
        $validator = Validator::make(['song_id' => (int)$id], [
            'song_id' => 'required|integer|exists:songs,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $countLike = DB::table('song_likes')->where(['song_likes.song_id' => $id, 'like' => 1])->count() ?? 0;
        $countDislike = DB::table('song_likes')->where(['song_likes.song_id' => $id, 'like' => 0])->count() ?? 0;
        return response()->json(['song_id' => (int)$id, 'like' => $countLike, 'dislike' => $countDislike], 200);
    }

    public function storeLikeDislike(Request $request, UserController $userController)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'song_id' => 'required|integer|exists:songs,id',
            'likedislike' => 'required|string|in:like,dislike',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $token = $userController->getAuthenticatedUser();
        if (!$request->user_id || ($request->user_id !== $token->getData()->user->id)) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'User ID invalid or not found.'], 400);
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
