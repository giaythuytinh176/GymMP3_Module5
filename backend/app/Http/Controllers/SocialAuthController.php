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

        $data = SocialAccountService::createOrGetUser($socialite, $social);
        if (!empty($data['error'])) {
            return redirect()->to('http://localhost:4200/#/user/login-facebook?error=' . $data['error']);
        } else {
            // auth()->login($data['data']);
            $token = JWTAuth::fromUser($data['data']);
            $redirectUrl = 'http://localhost:4200/#/user/login-facebook?token=' . $token . '&action=' . $data['status'];
//            dd($redirectUrl);
            return redirect()->to($redirectUrl);
        }
    }
}
