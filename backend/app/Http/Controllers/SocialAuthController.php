<?php

namespace App\Http\Controllers;

use App\Services\SocialAccountService;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use Tymon\JWTAuth\Facades\JWTAuth;

class SocialAuthController extends Controller
{
    public function redirect($social)
    {
        try {
            $socialiteRedirect = Socialite::driver($social)->redirect();
        } catch (InvalidStateException $e) {
            $socialiteRedirect = Socialite::driver($social)->stateless()->redirect();
        }
        return $socialiteRedirect;
    }

    public function callback($social)
    {
        try {
            $socialite = Socialite::driver($social)->user();
        } catch (InvalidStateException $e) {
            $socialite = Socialite::driver($social)->stateless()->user();
        }

        $user = SocialAccountService::createOrGetUser($socialite, $social);
        if ($user['error']) {
            return redirect()->to('http://localhost:4200/#/user/login-facebook?error=' . ($user['error']));
        } else {
            auth()->login($user);
            $token = JWTAuth::fromUser($user);
            return redirect()->to('http://localhost:4200/#/user/login-facebook?token=' . ($token));
        }
    }
}
