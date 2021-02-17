<?php

namespace App\Http\Controllers;

use App\Models\MovedSong;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Table;
use function PHPSTORM_META\map;

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
        return response()->json(compact('data'));
    }

    public function index()
    {
        $songs = DB::table('songs')->join('categories', 'songs.category_id', '=', 'categories.id')->select('songs.*', 'songs.category_id')->get();
        return response()->json($songs);
    }

    public function singersInfo($id)
    {
        $res = Song::with('singers')->get()->toArray();
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

    public function findSingerIDBySongID($id)
    {
        $list_singer_id = [];
        $data = DB::table('song_singer')->where('song_singer.song_id', '=', $id)->get();
        foreach ($data as $dt) {
            $list_singer_id[] = $dt->singer_id;
        }
        return $list_singer_id;
    }

    public function allSongs()
    {
        $data = Song::with('singers')->get();
        return response()->json(compact('data'), 200);
    }

    public function allSongsByID($id)
    {
        $res = Song::with('singers')->get()->toArray();
        $data = array_filter($res, function ($row) use ($id) {
            return $row['user_id'] === (int)$id;
        });
        $data = array_values($data);
        return response()->json(compact('data'), 200);
    }

    public function allMovedSongs()
    {
        $data = MovedSong::with('singers')->get();
        return response()->json(compact('data'), 200);
    }

    public function showidsong($id)
    {
        $song = Song::find($id);
        return response()->json($song);
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

    public function getUserIDbySongID($song_id)
    {
        $data = DB::table('songs')->where('id', '=', $song_id)->first();
        return $data->user_id;
    }

    public function getUserIDbyMovedSongID($song_id)
    {
        $data = DB::table('moved_songs')->where('id', '=', $song_id)->first();
        return $data->user_id;
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
        $song->singers()->detach();
        $song->delete();
        return response()->json($song);
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
        return response()->json($movedSong);
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
            ->orWhere('categories.category_name', 'like', '%' . $request->search . '%')
            ->orWhere('albums.album_name', 'like', '%' . $request->search . '%')
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

    public function getLastestSong(){
        $songs=DB::table('songs')->get();
//     $lastest=DB::table('songs')->orderBy('id','desc')->first();
//        $lastRecordData = DB::select('select * from songs order by created_at desc limit 5');
        $lastRecordData = Song::latest()->paginate(10)->toArray();
        $lastRecordData = $lastRecordData['data'];
//        dd($lastRecordData);
        return response()->json(compact('lastRecordData'));
    }

    public function showmoreSong(){
        $songs=DB::table('songs')->get();
        $lastRecordData = Song::limit(10)->offset(10)->latest('id')->get();;
        return response()->json(compact('lastRecordData'));
    }
}
