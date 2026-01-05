<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;


class UserInfomatiom extends Controller
{
    //
    public function store(Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user = Auth::user(); // 或 auth()->user()

        $user->update([
            'name' => $request->name,
        ]);

    return back(); // Inertia 會重新帶最新 user

    }
    public function index(Request $request){

        $name = Auth::user()->name;

        $user = User::firstWhere('name', $name);


        // dd($user);
          return Inertia::render('Auth/UserInfo', [
            'user' => $user
    ]);
    }
}
