<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Singer;
use App\Models\Category;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
<<<<<<< HEAD
<<<<<<< HEAD
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
=======
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
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

    public function findSinger(Request $request)
    {
        $word = $request->word;
        $data = Vietnamese::whereHas("englishs", function (\Illuminate\Database\Eloquent\Builder $builder) use ($word) {
            $builder->where('englishes.name', '=', $word);
        })->get();
        return response()->json($data, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
<<<<<<< HEAD
<<<<<<< HEAD
        $songs = DB::table('songs')->join('categories', 'songs.category_id', '=', 'categories.id')->select('songs.*', 'songs.category_id')->get();
=======
        $songs= DB::table('songs')->join('categories','songs.category_id','=','categories.id')->select('songs.*','songs.category_id')->get();
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
        $songs = DB::table('songs')->join('categories', 'songs.category_id', '=', 'categories.id')->select('songs.*', 'songs.category_id')->get();
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
            ->select('songs.*', 'users.username', 'categories.category_name', 'singers.singer_name', 'albums.album_name')
            ->join('users', 'users.id', '=', 'songs.user_id')
            ->join('categories', 'categories.id', '=', 'songs.category_id')
            ->join('singers', 'singers.id', '=', 'songs.singer_id')
            ->join('albums', 'albums.id', '=', 'songs.album_id')
            ->where('users.id', '=', $id)
            ->get();
<<<<<<< HEAD
=======
        ->select('songs.*','users.username','categories.category_name','singers.singer_name','albums.album_name')
        ->join('users','users.id','=','songs.user_id')
        ->join('categories','categories.id','=','songs.category_id')
        ->join('singers','singers.id','=','songs.singer_id')
        ->join('albums','albums.id','=','songs.album_id')
        ->where('users.id','=',$id)
        ->get();
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
        return response()->json($songs, 200);

    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
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
<<<<<<< HEAD
=======
    public function showidsong($id){
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
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
        $song = Song::find($id);
        $song->fill($request->all());
        $song->save();
        return response()->json($song);
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

}
