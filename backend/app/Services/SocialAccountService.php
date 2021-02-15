<?php

namespace App\Services;

use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountService
{
    public static function createOrGetUser(ProviderUser $providerUser, $social)
    {
        $account = SocialAccount::whereProvider($social)
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            return ['status' => 'login', 'data' => $account->user];
        } else {
            $email = $providerUser->getEmail() ?? $providerUser->getNickname();
            $username = substr($email, 0, strrpos($email, '@'));
            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => $social
            ]);
            $emailToCheck = User::whereEmail($email)->first();
            $createUser = str_replace([' ', '\r', '\n', '\s', '\t'], '', $providerUser->getName()) . '_' . $username;
            $userToCheck = DB::table('users')->where('username', $createUser)->first();
            if (!$emailToCheck && !$userToCheck) {
                $emailToCheck = User::create([
                    'name' => $providerUser->getName(),
                    'username' => $createUser,
                    'email' => $email,
                    'password' => Hash::make('codegym'),
                ]);
                return ['status' => 'register', 'data' => $emailToCheck];
            } else if ($emailToCheck) {
                $account->user()->associate($emailToCheck);
                $account->save();
                return ['status' => 'login', 'data' => $emailToCheck];
            } else {
                return ['error' => 'Username or Email already exists!'];
            }
        }
    }
}
