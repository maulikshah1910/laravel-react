<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $rules = [
            'username' => 'required|email',
            'password' => 'required',
        ];

        $messages = [
            'username.required' => 'Please enter username',
            'username.email' => 'Username must be valid email',
            'password.required' => 'Please enter password',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Inputs',
                'errors' => $validator->getMessageBag()
            ], 400);
        }

        $request->merge(['email' => $request->username]);
        $credentials = $request->only('email', 'password');

        if (! ($token = JWTAuth::attempt($credentials))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Credentials',
            ], 401);
        }
        
        return response()->json([
            'success' => true,
            'token' => $token,
        ], 200);
    }
}
