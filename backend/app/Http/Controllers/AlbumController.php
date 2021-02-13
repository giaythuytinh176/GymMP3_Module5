<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function findAlbum(Request $request)
    {
        $data = Album::find($request->id);
        return response()->json($data, 200);
    }

    public function index()
    {
        $data = Album::all();
        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Album $album)
    {
        //
    }

    public function update(Request $request, Album $album)
    {
        //
    }

    public function destroy(Album $album)
    {
        //
    }
}
