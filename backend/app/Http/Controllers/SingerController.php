<?php

namespace App\Http\Controllers;

use App\Models\Singer;
use App\Models\Category;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SingerController extends Controller
{
    public function index()
    {
        $data = Singer::with('songs')->get()->toArray();
        return response()->json(compact('data'));
    }

    public function addSingerToSong(Request $request, UserController $userController, SongController $songController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$songController->getUserIDbySongID($request->songId) || ($token->getData()->user->id !== $songController->getUserIDbySongID($request->songId))) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $songId = $request->songId;
        $singerName = $request->singerName;
        $singerId = $this->getInfoByName($singerName)['id'];
        $song = Song::find($songId);
        $existSingerInSong = $song->singers()->where('id', $singerId)->exists();
        if ($existSingerInSong) {
            return response()->json(['error' => 'Singer already existed in Song!'], 400);
        } else {
            $song->singers()->attach($singerId);
            return response()->json($song, 200);
        }
    }

    public function deleteSingerFromSong(Request $request, UserController $userController, SongController $songController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$songController->getUserIDbySongID($request->songId) || ($token->getData()->user->id !== $songController->getUserIDbySongID($request->songId))) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $songId = $request->songId;
        $singerName = $request->singerName;
        $singerId = $this->getInfoByName($singerName)['id'];
        $song = Song::find($songId);
        $existSingerInSong = $song->singers()->where('id', $singerId)->exists();
        if ($existSingerInSong) {
            $song->singers()->detach($singerId);
            return response()->json($song, 200);
        } else {
            return response()->json(['error' => 'Singer doesn\'t exist in Song!'], 400);
        }
    }

    public function getInfo($id)
    {
        $singer = Singer::where('id', $id)->first();
        return response()->json($singer, 200);
    }

    public function getInfoByName($singerName)
    {
        $singer = Singer::where('singers.singer_name', $singerName)->first()->toArray();
        return $singer;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'singer_name' => 'required|string|unique:singers',
            'image' => 'required|url',
            'description' => 'required|string',
            'date_of_birth' => 'string',
            'gender' => 'string',
            'music_genre' => 'string',
            'story' => 'string',
            'band' => 'string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $singer = new Singer();
        $singer->fill($request->all());
        $singer->save();
        return response()->json(compact(['singer']), 200);
    }

    public function show(Singer $singer)
    {
        //
    }

    public function update(Request $request, Singer $singer)
    {
        //
    }

    public function destroy(Singer $singer)
    {
        //
    }

    public function showSongSinger($singer_id)
    {
        $singer = Singer::with('songs')
            ->where('singers.id', $singer_id)->first()->toArray();
        $data = [];
        $listSong = [];
        foreach ($singer['songs'] as $val) {
            $data = $val;
            $category = Category::find($val['category_id'])->first()->toArray();
            $album = Album::find($val['album_id'])->first()->toArray();
            $data['category'] = $category['category_name'];
            $data['album'] = $album['album_name'];
            $listSong[] = $data;
        }
        return response()->json($listSong, 200);
    }

}
