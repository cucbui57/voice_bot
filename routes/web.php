<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','CallSteeringController@index');
Route::get('/auto-order','AutoOrderController@index');
Route::get('/customer-care','CustomerCareController@index');
Route::get('/telesale','TeleSaleController@index');

Route::post('/CallSteering/getHightChart', 'CallSteeringController@getHightChart');
Route::post('/CallSteering/getLineChart', 'CallSteeringController@getLineChart');
Route::post('/CallSteering/drawTableStatic','CallSteeringController@drawTableStatic' );
Route::post('/TeleSale/getHightChart', 'TeleSaleController@getHightChart');
Route::post('/AutoOrder/getHightChart', 'AutoOrderController@getHightChart');
Route::post('/CustomerCare/getHightChart', 'CustomerCareController@getHightChart');
