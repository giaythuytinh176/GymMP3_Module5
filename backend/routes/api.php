<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/search', 'SongController@search');

Route::prefix('user')->group(function () {
    Route::post('/signup', 'UserController@register');
    Route::post('/login', 'UserController@authenticate');
    Route::post('/check-username', 'UserController@checkExistUsername');
    Route::post('/remove-token', 'UserController@removeToken');

});

Route::prefix('song')->group(function () {
    Route::get('/list', 'SongController@allSongs');
    Route::get('/moved/list', 'SongController@allMovedSongs');
    Route::get('/lastest', 'SongController@getLastestSong');
    Route::get('/showmore', 'SongController@showMoreSong');

});

Route::group(['middleware' => ['jwt.verify']], function () {

    Route::prefix('song')->group(function () {
        Route::get('/user/list/{id}', 'SongController@show');
        Route::get('/user/listv2/{id}', 'SongController@allSongsByID');
        Route::get('/{id}', 'SongController@showidsong');
        Route::get('/', 'SongController@index');

        Route::post('/create', 'SongController@store');
        Route::post('/moved/create', 'SongController@store_moved');

        Route::put('/{id}', 'SongController@update');

        Route::delete('/{id}', 'SongController@destroy');
        Route::delete('/moved/{id}', 'SongController@destroyMoved');

    });

    Route::prefix('user')->group(function () {
        Route::get('/token', 'UserController@getAuthenticatedUser');
        Route::put('/update/{id}', 'UserController@update');
        Route::post('/change-password', 'UserController@changePassword');
    });

    Route::prefix('album')->group(function () {
        Route::get('/list', 'AlbumController@index');
        Route::get('/{id}', 'AlbumController@findAlbum');
        Route::post('/create', 'AlbumController@store');

    });

    Route::prefix('category')->group(function () {
        Route::get('/list', 'CategoryController@index');
        Route::get('/{id}', 'CategoryController@findCategory');
        Route::post('/create', 'CategoryController@store');

    });

    Route::prefix('singer')->group(function () {
        Route::get('/list', 'SingerController@index');
        Route::post('/create', 'SingerController@store');
        Route::get('/id/song-id/{id}', 'SongController@findSingerIDBySongID');
        Route::get('/id/song-id-v2/{id}', 'SongController@singersInfo');
        // for test
        Route::get('/name/song-id/{id}', 'SongController@findSingerBySongID');

    });

    Route::prefix('playlist')->group(function () {
        Route::get('/list', 'PlaylistController@index');
        Route::post('/create', 'PlaylistController@store');
        Route::get('/showlist/{id}', 'PlaylistController@show');
        Route::get('/{id}', 'PlaylistController@getInfo');

    });

});

