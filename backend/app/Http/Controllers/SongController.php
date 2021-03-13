<?php

namespace App\Http\Controllers;

use App\Models\MovedSong;
use App\Models\Playlist;
use App\Models\Singer;
use App\Models\Song;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SongController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nameSong' => 'required|string',
            'avatarUrl' => 'required|url',
            'mp3Url' => 'required|url|unique:songs',
            'describes' => 'required|string',
            'author' => 'required|string',
            'views' => 'required|integer',
            'user_id' => 'required|integer',
            'singer_id' => 'required|string',
            'category_id' => 'required|integer',
            'album_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data = new Song();
        $data->fill($request->all());
        $data->save();
        foreach (json_decode($request->singer_id, true) as $s_id) {
            $data->singers()->attach($s_id);
        }
        return response()->json(compact('data'));
    }

    public function store_moved(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nameSong' => 'required|string',
            'avatarUrl' => 'required|url',
            'mp3Url' => 'required|url|unique:moved_songs',
            'describes' => 'required|string',
            'author' => 'required|string',
            'views' => 'required|integer',
            'user_id' => 'required|integer',
            'singer_id' => 'required|string',
            'category_id' => 'required|integer',
            'album_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data = new MovedSong();
        $data->fill($request->all());
        $data->save();
        foreach (json_decode($request->singer_id, true) as $s_id) {
            $data->singers()->attach($s_id);
        }
        return response()->json(compact('data'), 200);
    }

    public function index()
    {
        $songs = DB::table('songs')->join('categories', 'songs.category_id', '=', 'categories.id')->select('songs.*', 'songs.category_id')->get();
        return response()->json($songs, 200);
    }

    public function singersInfo($id)
    {
        $res = Song::with('singers')->get()->toArray();
        // cach 1
//        $data = array_filter($res, function ($row) use ($id) {
//            return $row['id'] === (int)$id;
//        });
        // cach 2
        $data = array_filter($res, function ($row) use ($id) {
            return $row['id'] === (int)$id;
        });
        $data = array_values($data)[0]['singers'];
        $data = array_map(function ($row) {
            unset($row['pivot']);
            return $row;
        }, $data);
        return response()->json($data, 200);
    }

    public function show($user_id, Request $request, UserController $userController)
    {
        if (!$user_id) {
            return response()->json(['error' => 'User ID not found.'], 400);
        }
        $token = $userController->getAuthenticatedUser();
        if ($token->getData()->user->id !== (int)$user_id) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $songs = DB::table('songs')
            ->select('songs.*', 'users.username', 'categories.category_name', 'albums.album_name')
            ->join('users', 'users.id', '=', 'songs.user_id')
            ->join('albums', 'albums.id', '=', 'songs.album_id')
            ->join('categories', 'categories.id', '=', 'songs.category_id')
            ->where('users.id', '=', (int)$user_id)
            ->orderBy('songs.id', 'DESC')
            ->get()
            ->toArray();
        $data = [];
        $songs = json_decode(json_encode($songs), true);
        foreach ($songs as $song) {
            $data[]['singer_list_name'] = $this->findSingerBySongID($song['id']);
        }
        $last = array_replace_recursive($songs, $data);
        return response()->json($last, 200);
    }

    public function findSingerBySongID($id)
    {
        $list_singer_id = [];
        $data = DB::table('song_singer')->where('song_singer.song_id', '=', $id)->get();
        foreach ($data as $dt) {
            $list_singer_id[] = $this->findSingerNameBySingerID($dt->singer_id);
        }
        return $list_singer_id;
    }

    public function findSingerNameBySingerID($id)
    {
        $data = DB::table('singers')->where('singers.id', '=', $id)->first();
        return $data->singer_name;
    }

    public function allSongs()
    {
        // limit 10 bai hat va random khi tra ve
        $data = Song::with('singers')->inRandomOrder()->limit(9)->get()->toArray();
        return response()->json(compact('data'), 200);
    }

    public function allSongsByID($id)
    {
        $res = Song::with('singers')->orderByDesc('id')->get()->toArray();
        $data = array_filter($res, function ($row) use ($id) {
            return $row['user_id'] === (int)$id;
        });
        $data = array_values($data);
        return response()->json($data, 200);
    }

    public function allMovedSongs()
    {
        $data = MovedSong::with('singers')->get();
        return response()->json(compact('data'), 200);
    }

    public function showSongById($id, Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$this->getUserIDbySongID($request->id) || ($token->getData()->user->id !== $this->getUserIDbySongID($request->id))) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $song = Song::with('singers')->where('songs.id', $id)->first()->toArray();
        return response()->json($song, 200);
    }

    public function getUserIDbySongID($song_id)
    {
        $data = DB::table('songs')->where('id', '=', $song_id)->first();
        return $data->user_id;
    }

    public function showSongGuest($id)
    {
        $song = Song::with('singers')->where('songs.id', $id)->first()->toArray();
        return response()->json($song, 200);
    }

    public function getSongSameSinger($id)
    {
        $listSingersId = $this->findSingerIDBySongID($id);
        $listSongs = [];
        foreach ($listSingersId as $SingerId) {
            $listSongs[] = ($this->findSongBySingerId($SingerId));
        }
        $listSongsMerge = [];
        foreach ($listSongs as $listSong) {
            foreach ($listSong as $item) {
                $listSongsMerge[] = $item;
            }
        }
        $lastListSongs = array_map(function ($row) {
            return $row['id'];
        }, $listSongsMerge);
        $lastListSongs = array_unique($lastListSongs);
        $lastListSongs = array_values($lastListSongs);
        sort($lastListSongs);
        $lastInfoListSongs = [];
        foreach ($lastListSongs as $it) {
            $lastInfoListSongs[] = $this->findSongInfo($it);
        }
        return response()->json($lastInfoListSongs, 200);
    }

    public function findSingerIDBySongID($id)
    {
        $list_singer_id = [];
        $data = DB::table('song_singer')->where('song_singer.song_id', '=', $id)->get();
        foreach ($data as $dt) {
            $list_singer_id[] = $dt->singer_id;
        }
        return $list_singer_id;
    }

    public function findSongBySingerId($id)
    {
        $songs = Song::whereHas('singers', function (Builder $query) use ($id) {
            $query->where('singers.id', $id);
        })->get()->toArray();
        return $songs;
    }

    public function findSongInfo($id)
    {
        return DB::table('songs')->where('id', $id)->first();
    }

    public function update(Request $request, $id, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$this->getUserIDbySongID($request->id) || ($token->getData()->user->id !== $this->getUserIDbySongID($request->id))) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $validator = Validator::make($request->all(), [
            'nameSong' => 'required|string',
            'describes' => 'required|string',
            'author' => 'required|string',
            'views' => 'required|integer',
            'user_id' => 'required|integer',
            'avatarUrl' => 'required|url',
            'mp3Url' => 'required|url',
            'singer_id' => 'required|string',
            'category_id' => 'required|integer',
            'album_id' => 'required|integer',
        ], [
            'category_id.required' => 'The category field is required or does not exist yet.',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data = Song::findOrFail($id);
        $data->fill($request->all());
        $data->save();
        $data->singers()->detach();
        foreach (json_decode($request->singer_id, true) as $s_id) {
            $data->singers()->attach($s_id);
        }
        return response()->json(compact('data'));
    }

    public function destroy(Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$request->user_id || ($request->user_id !== $token->getData()->user->id)) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'User ID invalid or not found.'], 400);
        }
        if (!$this->getUserIDbySongID($request->id) ||
            ($token->getData()->user->id !== $this->getUserIDbySongID($request->id))
        ) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $song = Song::findOrFail($request->id);
//        $song->playlists()->detach();
//        $song->singers()->detach();
//        $song->song_comments()->delete();
//        $song->songlikes()->delete();
        DB::table("song_playlist")->where("song_id", $request->id)->delete();
        DB::table("song_singer")->where("song_id", $request->id)->delete();
        DB::table("song_comments")->where("song_id", $request->id)->delete();
        DB::table("song_likes")->where("song_id", $request->id)->delete();
        $song->delete();
        return response()->json($song, 200);
    }

    public function destroyMoved(Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$request->user_id || ($request->user_id !== $token->getData()->user->id)) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'User ID invalid or not found.'], 400);
        }
        if (!$this->getUserIDbyMovedSongID($request->id) ||
            ($token->getData()->user->id !== $this->getUserIDbyMovedSongID($request->id))
        ) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $movedSong = MovedSong::findOrFail($request->id);
        $movedSong->singers()->detach();
        $movedSong->delete();
        return response()->json($movedSong, 200);
    }

    public function getUserIDbyMovedSongID($song_id)
    {
        $data = DB::table('moved_songs')->where('id', '=', $song_id)->first();
        return $data->user_id;
    }

    public function search(Request $request)
    {
        if ($request->search == '' || !$request->search) {
            return response()->json(['keyword' => 'You haven\'t enter Keywords.'], 200);
        }

        $songs = DB::table('songs')
            ->select('songs.*', 'users.username', 'categories.category_name', 'albums.album_name')
            ->join('users', 'users.id', '=', 'songs.user_id')
            ->join('categories', 'categories.id', '=', 'songs.category_id')
            ->join('albums', 'albums.id', '=', 'songs.album_id')
            ->where('songs.nameSong', 'like', '%' . $request->search . '%')
//            ->orWhere('categories.category_name', 'like', '%' . $request->search . '%')
//            ->orWhere('albums.album_name', 'like', '%' . $request->search . '%')
            ->orWhere('users.username', 'like', '%' . $request->search . '%')
            ->orWhere('songs.author', 'like', '%' . $request->search . '%')
            ->get()
            ->toArray();
//        dd($songs);
        $data = [];
        $songs = json_decode(json_encode($songs), true);
        foreach ($songs as $song) {
            $data[]['singer_list_name'] = $this->findSingerBySongID($song['id']);
        }
        $last = array_replace_recursive($songs, $data);
        return response()->json($last, 200);
    }

    public function getLastestSong()
    {
        $data = Song::with('singers')->latest()->paginate(12)->toArray();
        $lastRecordData = $data['data'];
        return response()->json($lastRecordData, 200);
    }

    public function showMoreSong()
    {
        $lastRecordData = Song::with('singers')->limit(12)->offset(12)->latest('id')->get();;
        return response()->json($lastRecordData, 200);
    }
}
