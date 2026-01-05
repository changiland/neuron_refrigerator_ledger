<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
//use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register'); // 返回註冊頁面的 Inertia 響應
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]); // 驗證請求資料

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]); // 創建新用戶

        event(new Registered($user));
        \Log::info('Registered event fired for user:'.$user->email);

        Auth::login($user);

        return redirect()->route('verification.notice'); 

        //return redirect(RouteServiceProvider::HOME);

        /*
         // 登入（建立 session）
        auth()->login($user);

        // 📬 寄出信箱確認信
        $user->sendEmailVerificationNotification();

        // 回傳到確認信提示畫面
        return redirect()->route('verification.notice');
        */
    }
}
