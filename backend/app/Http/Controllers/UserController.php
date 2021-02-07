<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function removeToken(Request $request)
    {
        $token = $request->token;
        $data = JWTAuth::setToken($token)->invalidate();
        return response()->json(compact('data'), 200);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('username', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function checkExistUsername(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:100|unique:users',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        return response()->json('valid', 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:100|unique:users',
            'phone' => 'required|string|max:11|unique:users',
            'password' => 'required|string|min:6|max:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'username' => $request->get('username'),
            'phone' => $request->get('phone'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function changePassword(Request $request)
    {
        if ($request->new_password === $request->password) {
            $error = ['Your new password must be different from your previous password.'];
            return response()->json(compact('error'));
        }

        if ($request->new_password !== $request->confirm_new_password) {
            $error = ['Passwords do not match'];
            return response()->json(compact('error'));
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_password' => 'required|string|min:6|max:8',
            'confirm_new_password' => 'required|string|min:6|max:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $check = $this->updatePasswordCheck($request) ? $this->resetPassword($request) : $this->tokenNotFoundError();

        return $check;
    }

    // Verify if token is valid
    private function updatePasswordCheck($request)
    {
        return auth()->attempt(['username' => $request->username, 'password' => $request->password]);
    }

    // Token not found response

    private function resetPassword($request)
    {
        // find email
        $userData = User::where('username', '=', $request->username)->first();
        // update password
        $userData->update([
            'password' => bcrypt($request->new_password)
        ]);
        // reset password response
        return response()->json([
            'data' => 'Password has been updated.'
        ], Response::HTTP_CREATED);
    }

    // Reset password
    private function tokenNotFoundError()
    {
        return response()->json([
            'error' => 'Either your email or token is wrong.'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone' => 'required|string|max:11',
            'avatar' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::findOrFail($id);
        $user->fill($request->all());
        $user->save();
        return response()->json(compact('user'));
    }
}
