<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Singer;
use App\Models\Category;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SongController extends Controller
{
    public function createSong(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nameSong' => 'required|string',
            'avatarUrl' => 'required|string',
            'mp3Url' => 'required|string|unique:songs',
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

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $songs = DB::table('songs')->join('categories', 'songs.category_id', '=', 'categories.id')->select('songs.*', 'songs.category_id')->get();
        return response()->json($songs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $song = new Song();
        $song->fill($request->all());
        $song->save();
        return response()->json($song);
    }

    /**
     * Display the specified resource.
     *
     * @param Song $song
     * @return Response
     */
    public function show($id)
    {
        $songs = DB::table('songs')
            ->select('songs.*', 'users.username', 'categories.category_name', 'albums.album_name')
            ->join('users', 'users.id', '=', 'songs.user_id')
            ->join('albums', 'albums.id', '=', 'songs.album_id')
            ->join('categories', 'categories.id', '=', 'songs.category_id')
//            ->join('song_singer', 'singer_id', '=')
            ->where('users.id', '=', $id)
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

    public function findSingerIDBySongID($id)
    {
        $list_singer_id = [];
        $data = DB::table('song_singer')->where('song_singer.song_id', '=', $id)->get();
        foreach ($data as $dt) {
            $list_singer_id[] = $dt->singer_id;
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
//        $data = DB::table('songs')
//            ->select('songs.*', 'users.username', 'categories.category_name', 'singers.singer_name', 'albums.album_name')
//            ->join('users', 'users.id', '=', 'songs.user_id')
//            ->join('categories', 'categories.id', '=', 'songs.category_id')
//            ->join('singers', 'singers.id', '=', 'songs.singer_id')
//            ->join('albums', 'albums.id', '=', 'songs.album_id')
//            ->get();
        $data = Song::with('singers')->get();
        return response()->json(compact('data'), 200);
    }

    public function showidsong($id)
    {
        $song = Song::find($id);
        return response()->json($song);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Song $song
     * @return Response
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Song $song
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nameSong' => 'required|string',
            'describes' => 'required|string',
            'author' => 'required|string',
            'views' => 'required|integer',
            'user_id' => 'required|integer',
//            'avatarUrl' => 'required|string',
//            'mp3Url' => 'required|string',
//            'singer_id' => 'required|string',
//            'category_id' => 'required|integer',
//            'album_id' => 'required|integer',
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

    /**
     * Remove the specified resource from storage.
     *
     * @param Song $song
     * @return Response
     */
    public function destroy($id)
    {
        $song = Song::find($id);
        $song->delete();
        return response()->json($song);
    }

    public function search(Request $request)
    {
        $songs = DB::table('songs')
            ->select('songs.*', 'users.username', 'categories.category_name','albums.album_name')
            ->join('users', 'users.id', '=', 'songs.user_id')
            ->join('categories', 'categories.id', '=', 'songs.category_id')
            ->join('albums', 'albums.id', '=', 'songs.album_id')
            // ->join('song_singer', 'songs.id', '=', 'song_singer.song_id')
            // ->join('singers', 'song_singer.singer_id', '=', 'singers.id')
            // ->groupBy('song_singer.singer_id')
            ->where('songs.nameSong', 'like', '%' . $request->search . '%')
            ->orWhere('categories.category_name', 'like', '%' . $request->search . '%')
            ->orWhere('albums.album_name', 'like', '%' . $request->search . '%')
            // ->orWhere('singers.singer_name', 'like', '%' . $request->search . '%')
            ->get()
            ->toArray();
        $data = [];
        $songs = json_decode(json_encode($songs), true);
        foreach ($songs as $song) {
            $data[]['singer_list_name'] = $this->findSingerBySongID($song['id']);
        }
        $last = array_replace_recursive($songs, $data);
        return response()->json($last, 200);
        // return response()->json($songs, 200);
    }

}
