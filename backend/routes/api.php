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

Route::post('signup', '\App\Http\Controllers\UserController@register');
Route::post('login', '\App\Http\Controllers\UserController@authenticate');
Route::get('/songs/list', [\App\Http\Controllers\SongController::class, 'allSongs']);
Route::post('/search','\App\Http\Controllers\SongController@search');


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', '\App\Http\Controllers\UserController@getAuthenticatedUser');
    Route::put('/users/{id}', '\App\Http\Controllers\UserController@update')->name('users.update');
    Route::post('changePassword', '\App\Http\Controllers\UserController@changePassword');
    Route::post('/song/create', '\App\Http\Controllers\SongController@createSong');
    Route::get('/albums/list', '\App\Http\Controllers\AlbumController@index');
    Route::get('/categories/list', '\App\Http\Controllers\CategoryController@index');
    Route::get('/singers/list', '\App\Http\Controllers\SingerController@index');
    Route::put('/songs/{id}', [\App\Http\Controllers\SongController::class, 'update']);
    Route::get('/songs/{id}', [\App\Http\Controllers\SongController::class, 'showidsong']);
    Route::delete('/songs/{id}', [\App\Http\Controllers\SongController::class, 'destroy']);
    Route::get('/songs',[\App\Http\Controllers\SongController::class,'index']);
    Route::post('/songs', [\App\Http\Controllers\SongController::class, 'store']);
    Route::get('listsongs/{id}','\App\Http\Controllers\SongController@show');
    Route::get('findSingerBySongID/{id}','\App\Http\Controllers\SongController@findSingerBySongID');

});

// Route::prefix('songs')->group(function(){
//     Route::get('/{id}','\App\Http\Controllers\SongController@show');
// });


