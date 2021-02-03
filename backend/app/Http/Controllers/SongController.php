<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Singer;
use App\Models\Category;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $songs= DB::table('songs')->join('categories','songs.category_id','=','categories.id')->select('songs.*','songs.category_id')->get();
        return response()->json($songs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $songs = DB::table('songs')
        ->select('songs.*','users.username','categories.category_name','singers.singer_name','albums.album_name')
        ->join('users','users.id','=','songs.user_id')
        ->join('categories','categories.id','=','songs.category_id')
        ->join('singers','singers.id','=','songs.singer_id')
        ->join('albums','albums.id','=','songs.album_id')
        ->where('users.id','=',$id)
        ->get();
        return response()->json($songs, 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $song = Song::find($id);
        $song->fill($request->all());
        $song->save();
        return response()->json($song);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Song  $song
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $song = Song::find($id);
        $song->delete();
        return response()->json($song);
    }

}
