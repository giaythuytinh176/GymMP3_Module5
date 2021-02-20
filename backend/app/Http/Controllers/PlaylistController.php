<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
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
        $auth = true;
        $token = $userController->getAuthenticatedUser();
        if (!$this->getUserIDbyPlaylistID($request->id) ||
            ($token->getData()->user->id !== $this->getUserIDbyPlaylistID($request->id))
        ) {
//            $userController->removeToken($request, $request->bearerToken());
//            return response()->json(['error' => 'invalid_access'], 400);
            $auth = false;
        }
        $data = Playlist::find($id);
        return response()->json(compact(['data', 'auth']), 200);
    }

    public function getUserIDbyPlaylistID($id)
    {
        $data = DB::table('playlists')->where('id', $id)->first();
        return !empty($data->user_id) ? (int)$data->user_id : 0;
    }

    public function getSongExcept(Request $request)
    {
        // limit 10 bai hat va random khi tra ve
        $listSongInPlaylist = json_decode($request->listSong, true);
        $countSongPlaylist = count($listSongInPlaylist);
        // dd($listSongInPlaylist);     // ->inRandomOrder() remove random song except
        $data = Song::with('singers')->limit(10 + $countSongPlaylist)->get()->toArray();
        //  $result = array_diff($listSongInPlaylist, $data);
        $list1 = [];
        $list2 = [];
        foreach ($listSongInPlaylist as $item) {
            $list1[] = (int)$item['id'];
        }
        foreach ($data as $datum) {
            $list2[] = (int)$datum['id'];
        }
        $diff = array_merge(array_diff($list1, $list2), array_diff($list2, $list1));

        $listExcept = [];
        foreach ($diff as $item) {
            $listExcept[] = $this->getSongInfoByID($item);
        }
        $listExcept = array_values($listExcept);
        return response()->json($listExcept, 200);
    }

    public function getSongInfoByID($id)
    {
        return DB::table('songs')->where('id', $id)->first();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_playlist' => 'required|string',
            'description' => 'required|string',
            'user_id' => 'required|integer',
            'view' => 'required|integer',
            'status' => 'required|string',
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

    public function deleteSongOfPlaylist(Request $request, UserController $userController)
    {
        $token = $userController->getAuthenticatedUser();
        if (!$request->user_id || ($request->user_id !== $token->getData()->user->id)) {
            $userController->removeToken($request, $request->bearerToken());
            return response()->json(['error' => 'User ID invalid or not found.'], 400);
        }

        $pl = Playlist::findOrFail($request->id);
        $pl->songs()->detach($request->song_id);
        return response()->json($pl, 200);
    }

    public function createSong($song_id, $playlist_id)
    {
        $pl = Playlist::find($playlist_id);
        $pivot = $pl->songs()->where('song_id', $song_id)->exists();
        $playlist = false;
        if (!$pivot) {
            $playlist = DB::table('song_playlist')
                ->insert(['song_id' => $song_id, 'playlist_id' => $playlist_id]);
//            $playlist = $pl->songs()->attach($song_id); // not show true even added to pivot
        }
        return response()->json(['pl' => $playlist, 'exist' => $pivot], 200);
    }

    public function showSongPlaylist($playlist_id)
    {
        $playlist = Playlist::with('songs')->where('playlists.id', '=', $playlist_id)->first();
        return response()->json($playlist['songs'], 200);
    }

    public function getImageSongRandomPlaylist($playlist_id)
    {
        $pl = Playlist::with('songs')->where('playlists.id', '=', $playlist_id)->first();
        if ($pl == null) return response()->json(['error' => $pl], 200);
        elseif (empty(Playlist::with('songs')->where('playlists.id', '=', $playlist_id)->first()->toArray()['songs'])) {
            return response()->json(['error' => 'empty playlist.'], 200);
        } else {
            return response()->json(['image' => $pl->toArray()['songs'][array_rand($pl->toArray()['songs'])]['avatarUrl']], 200);
        }
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
            ->where('playlists.status', 'on')// Enable on searching
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
        $result = array_values($result);
        return response()->json($result, 200);
    }

    public function getLastestPlaylist()
    {
        // $data = Playlist::latest()->paginate(4)->toArray();
        $data = DB::table('playlists')->select('playlists.*', 'users.username')
        ->join('users','playlists.user_id', '=','users.id')
        ->where('playlists.status', '=', 'on')
        ->latest()->paginate(4)->toArray();
        $lastRecordData = $data['data'];
        return response()->json(compact('lastRecordData'));
    }

    public function getSongToLastPlaylist($id)
    {
        $playlist = Playlist::with('songs')
        ->select('playlists.*','users.username')
        ->join('users','users.id','=','playlists.user_id')
        ->where([
            ['playlists.status', '=', 'on'],
            ['playlists.id', '=', $id],
        ])
        ->first()->toArray();
        return response()->json($playlist['songs']);
    }

    public function getDetailLastestPlaylist($id)
    {
        // $data = Playlist::latest()->paginate(4)->toArray();
        $data = DB::table('playlists')->select('playlists.*', 'users.username')
        ->join('users','playlists.user_id', '=','users.id')
        ->where([
            ['playlists.status', '=', 'on'],
            ['playlists.id', '=', $id],
        ])
        ->first();
        return response()->json($data);
    }

    
}
