<?php

namespace App\Http\Controllers;

use App\Models\Singer;
use App\Models\Category;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SingerController extends Controller
{
    public function index()
    {
        $data = Singer::with('songs')->get()->toArray();
        return response()->json(compact('data'));
    }

    public function getInfor($id)
    {
       $singer = Singer::where('id', $id)->first();
        return response()->json($singer);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'singer_name' => 'required|string|unique:singers',
            'image' => 'required|url',
            'description' => 'required|string',
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
                    ->where('singers.id',  $singer_id )->first()->toArray();
        $data = [];
        $listSong = [];
        foreach($singer['songs'] as $val)
        {
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
