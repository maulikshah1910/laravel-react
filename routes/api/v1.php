<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    dd('V1 Routes');
});


Route::post('login', [AuthController::class, 'login'])->name('login');
