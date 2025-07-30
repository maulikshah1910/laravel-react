<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FilesController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Middleware\ApiAuthenticationMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    dd('V1 Routes');
});

Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware(ApiAuthenticationMiddleware::class)->group(function() {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('me', [AuthController::class, 'me'])->name('me');

    Route::group(['prefix' => 'files'], function() {
        Route::get('list', [FilesController::class, 'list'])->name('files.list');
        Route::post('store', [FilesController::class, 'store'])->name('files.store');
        Route::get('{id}', [FilesController::class, 'info'])->name('files.info');
        Route::post('{id}/update', [FilesController::class, 'update'])->name('files.update');
    });

    Route::group(['prefix' => 'profile'], function() {
        Route::post('update-password', [ProfileController::class, 'updatePassword'])->name('update-password');
    });
});