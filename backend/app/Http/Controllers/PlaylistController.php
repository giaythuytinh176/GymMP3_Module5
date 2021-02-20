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

    public function getInfo($id, Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$this->getUserIDbyPlaylistID($request->id) ||
            ($token->getData()->user->id !== $this->getUserIDbyPlaylistID($request->id))
        ) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'invalid_access'], 400);
        }

        $data = Playlist::find($id);
        return response()->json($data, 200);
    }

    public function getUserIDbyPlaylistID($id)
    {
        $data = DB::table('playlists')->where('id', $id)->first();
        return !empty($data->user_id) ? (int)$data->user_id : 0;
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

    public function destroy(Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$request->user_id || ($request->user_id !== $token->getData()->user->id)) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'User ID invalid or not found.'], 400);
        }

        $pl = Playlist::findOrFail($request->id);
        $pl->songs()->detach();
        $pl->delete();
        return response()->json($pl);
    }

    public function createSong($song_id, $playlist_id)
    {
        $playlist = DB::table('song_playlist')
            ->insert(['song_id' => $song_id, 'playlist_id' => $playlist_id]);
        return response()->json($playlist, 200);
    }

    public function showSongPlaylist($playlist_id)
    {
        $playlist = Playlist::with('songs')->where('playlists.id', 'like', '%' . $playlist_id . '%')->get()->toArray();
        return response()->json($playlist, 200);
    }

    public function search(Request $request)
    {
        if ($request->search == '' || !$request->search) {
            return response()->json(['keyword' => 'You haven\'t enter Keywords.'], 200);
        }
        $playlists = DB::table('categories')
            ->select('playlists.*')
            ->join('songs', 'categories.id', '=', 'songs.category_id')
            ->join('song_playlist', 'songs.id', '=', 'song_playlist.song_id')
            ->join('playlists', 'song_playlist.playlist_id', '=', 'playlists.id')
            ->join('users', 'songs.user_id', '=', 'users.id')
            ->where('playlists.name_playlist', 'like', '%' . $request->search . '%')
            ->orWhere('categories.category_name', 'like', '%' . $request->search . '%')
            ->orWhere('songs.author', 'like', '%' . $request->search . '%')
            ->orWhere('users.username', 'like', '%' . $request->search . '%')
            ->get()
            ->toArray();
        $result = array();
        foreach ($playlists as $key => $value) {
            if (in_array($value, $result)) continue;
            $result[$key] = $value;
        }
        return response()->json($result, 200);
    }

    public function getLastestPlaylist()
    {
        // $data = Playlist::latest()->paginate(4)->toArray();
        $data = DB::table('playlists')->select('playlists.*', 'users.username')
        ->join('users','playlists.user_id', '=','users.id')
        ->latest()->paginate(4)->toArray();
        $lastRecordData = $data['data'];
        return response()->json(compact('lastRecordData'));
    }
}
