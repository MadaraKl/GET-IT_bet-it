<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $input = $request->only('username', 'password');
        $token = null;
 
        if (!$token = auth()->attempt($input)) {
            return response()->json([
                'message' => 'Invalid Email or Password',
            ], 401);
        }
 
        return response()->json([
            'token' => $token,
            'expiresIn'   => auth()->factory()->getTTL() * 60
        ]);
    }
 
    public function logout(Request $request)
    {
        auth()->logout();
 
        return response()->json(['message' => 'Successfully logged out']);
    }
 
    public function refresh(Request $request)
    {
        $newToken = auth()->refresh();
 
        return response()->json([
            'token' => $newToken,
            'expiresIn'   => auth()->factory()->getTTL() * 60
        ]);
    }
 
    public function me(Request $request)
    {
        $user = auth()->user();
 
        return response()->json($user);
    }
}
