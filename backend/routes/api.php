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

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', '\App\Http\Controllers\UserController@getAuthenticatedUser');
    Route::put('/users/{id}', '\App\Http\Controllers\UserController@update')->name('users.update');
    Route::post('changePassword', '\App\Http\Controllers\UserController@changePassword');
});



