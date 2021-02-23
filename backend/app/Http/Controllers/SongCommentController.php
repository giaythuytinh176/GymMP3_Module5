<?php

namespace App\Http\Controllers;

use App\Models\SongComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongCommentController extends Controller
{

    public function index()
    {
        //
    }

    public function store(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'content' => 'required|string',
            'song_id' => 'required|integer|exists:songs,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $songComment = new SongComment();
        $songComment->fill($request->all());
        $songComment->save();
        return response()->json($songComment, 200);
    }

    public function show(SongComment $songComment, $id)
    {
        $data = $songComment::query()->select()->where('song_id', $id)->get()->toArray();
        return response()->json($data, 200);
    }

    public function update(Request $request, SongComment $songComment)
    {
        //
    }

    public function destroy(SongComment $songComment)
    {
        //
    }
}
