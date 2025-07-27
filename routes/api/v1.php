<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Middleware\ApiAuthenticationMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    dd('V1 Routes');
});


Route::post('login', [AuthController::class, 'login'])->name('login');


Route::middleware(ApiAuthenticationMiddleware::class)->group(function() {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('me', [AuthController::class, 'me'])->name('me');
});