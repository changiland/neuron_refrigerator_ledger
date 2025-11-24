<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\NewsController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Welcome Page

Route::get('/', [NewsController::class, 'index'])->name('Welcome');

// 註冊 Page
Route::get('/Register', function () {
    return Inertia::render('Auth/Register');
})->name('Register');

Route::get('/register', [RegisteredUserController::class, 'create'])->middleware('guest')->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('guest');

Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware(['auth'])->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill(); // 標記 email_verified_at
    return redirect('/MyStock');
})->middleware(['auth', 'signed'])->name('verification.verify');

// 登入 Page
Route::get('/Login', function () {
    return Inertia::render('Auth/Login');
})->name('Login');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// 帳號使用者資料
Route::get('/MyStock', [NewsController::class, 'index'])->middleware(['auth', 'verified'])->name('MyStock');

Route::get('/MyStock/StockInfo', function () {
    return Inertia::render('Auth/StockInfo');
})->name('StockInfo');

Route::get('/MyStock/ArrivalHistory', function () {
    return Inertia::render('Auth/ArrivalHistory');
})->name('ArrivalHistory');

Route::get('/MyStock/ArrivalHistory/ArrivalDetail', [EventController::class, 'index'])->name('ArrivalDetail');

Route::get('/MyStock/CostsHistory', function () {
    return Inertia::render('Auth/CostsHistory');
})->name('CostsHistory');

// 最新消息
Route::get('/News', [NewsController::class, 'index'])->name('News');

// 質問
Route::get('/QandA', [InquiryController::class, 'index'])->name('QandA');

// 設計者通道
Route::get('/AdminPage', function () {
    return Inertia::render('Auth/AdminPage');
})->name('AdminPage');
Route::get('/AdminPage/QandAForm', [InquiryController::class, 'index'])->name('QandAForm');
Route::post('/inquiry/store', [InquiryController::class, 'store'])->name('inquiry.store');
Route::get('/AdminPage/NewsForm', [NewsController::class, 'index'])->name('NewsForm');
Route::post('/news/store', [NewsController::class, 'store'])->name('news.store');

