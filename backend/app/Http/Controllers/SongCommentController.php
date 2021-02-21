<?php

namespace App\Http\Controllers;

use App\Models\SongComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param \App\Models\SongComment $songComment
     * @return \Illuminate\Http\Response
     */
    public function show(SongComment $songComment, $id)
    {
        $data = $songComment::query()->select()->where('song_id', $id)->get()->toArray();
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\SongComment $songComment
     * @return \Illuminate\Http\Response
     */
    public function edit(SongComment $songComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\SongComment $songComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SongComment $songComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\SongComment $songComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(SongComment $songComment)
    {
        //
    }
}
