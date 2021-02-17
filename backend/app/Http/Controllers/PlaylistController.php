<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PlaylistController extends Controller
{
    public function index()
    {
        $data = Playlist::all();
        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_playlist' => 'required|string|unique:playlists',
            'description' => 'required|string',
            'user_id' => 'required|integer',
            'view' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $playlist = new Playlist();
        $playlist->fill($request->all());
        $playlist->save();
        return response()->json(compact(['playlist']), 200);
    }

    public function show($user_id, Request $request,UserController $userController)
    {
        if (!$user_id) {
            return response()->json(['error' => 'User ID not found.'], 400);
        }
        $token = $userController->getAuthenticatedUser();
        if ($token->getData()->user->id !== (int)$user_id) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $playlists = DB::table('playlists')
            ->select('playlists.*', 'users.username')
            ->join('users', 'users.id', '=', 'playlists.user_id')
            ->where('users.id', '=', (int)$user_id)
            ->get();
        return response()->json($playlists, 200);
    }

    public function update(Request $request, Playlist $playlist)
    {
        //
    }

    public function destroy(Playlist $playlist)
    {
        //
    }

    public function createSong($id)
    {

    }
}
