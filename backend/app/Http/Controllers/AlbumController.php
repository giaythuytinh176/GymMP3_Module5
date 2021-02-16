<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'album_name' => 'required|string|unique:albums',
            'image' => 'required|url',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $album = new Album();
        $album->fill($request->all());
        $album->save();
        return response()->json(compact(['album']), 200);
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
