<?php

use Illuminate\Http\Request;

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


Route::get('/',function() {
    return response()->json([
        'status' => 'OK'
    ]);
});

Route::group(['middleware' => 'auth.jwt'], function() {
    Route::group(['prefix' => 'bet'], function () {
        Route::post('make-bet', 'BetController@makeBet');
    });


    Route::group(['prefix' => 'match'], function () {
        Route::get('get-matches', 'MatchController@getMatches');
        Route::get('get-upcoming-matches', 'MatchController@getUpcomingMatches');
    });

    Route::group(['prefix' => 'wallet'], function () {
        Route::post('add-amount', 'WalletController@addAmount');
        Route::post('withdraw-amount', 'WalletController@withdrawAmount');
        Route::get('get-amount', 'WalletController@getAmount');
        Route::get('get-wallet-actions', 'WalletController@getWalletActions');
    });
});

Route::group(['prefix' => 'auth'], function() {
    Route::post('login', 'AuthController@login');
 
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('me', 'AuthController@me');
    Route::post('logout', 'AuthController@logout');
    Route::get('refresh', 'AuthController@refresh');
});
});