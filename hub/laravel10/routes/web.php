<?php

use App\Http\Controllers\ArrivalInventory;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryMonthly;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserInfomatiom;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;

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
Route::get('/登録', function () {
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
Route::get('/ログイン', function () {
    return Inertia::render('Auth/Login');
})->name('Login');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/ログアウト', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// 帳號使用者資料

Route::get('/在庫状況', [NewsController::class, 'index'])->middleware(['auth', 'verified'])->name('MyStock');

Route::get('/user-info', [UserInfomatiom::class, 'index'])->name('userInfo');

Route::post('/userinfo/store', [UserInfomatiom::class, 'store'])->name('userinfo.store');

Route::put('/user/password', [PasswordController::class, 'update'])
        ->name('password.update');

Route::post('/user/store', [PasswordResetLinkController::class, 'store'])->name('user.store');

Route::get('/password/reset/{token}', [NewPasswordController::class, 'create'])
    ->name('password.reset');

Route::post('/password/reset', [NewPasswordController::class, 'store'])
    ->name('password.update');

Route::get('/在庫状況/在庫情報', [InventoryController::class, 'show'])->name('StockInfo');

Route::get('/在庫状況/入荷履歴', [ArrivalInventory::class, 'index'])->name('ArrivalHistory');

Route::get('/在庫状況/入荷履歴/入荷詳細', [ArrivalInventory::class, 'show'])->name('ArrivalDetail');

Route::get('/在庫状況/消費履歴', [InventoryMonthly::class, 'index'])->name('CostsHistory');

// 最新消息
Route::get('/ニュース', [NewsController::class, 'index'])->name('News');
Route::get('/ニュース/{title}', [NewsController::class, 'show'])->name('NewsDetail');

// 質問
Route::get('/お問い合わせ', [InquiryController::class, 'index'])->name('QandA');

// 設計者通道
Route::get('/AdminPage', function () {
    return Inertia::render('Auth/AdminPage');
})->name('AdminPage');
Route::get('/AdminPage/QandAForm', [InquiryController::class, 'index'])->name('QandAForm');
Route::post('/inquiry/store', [InquiryController::class, 'store'])->name('inquiry.store');
Route::get('/AdminPage/NewsForm', [NewsController::class, 'index'])->name('NewsForm');
Route::post('/news/store', [NewsController::class, 'store'])->name('news.store');
Route::get('/AdminPage/AdminProduct', [InventoryController::class, 'index'])->name('AdminProduct');
Route::post('/products/store', [InventoryController::class, 'store'])->name('products.store');
Route::post('/products/updata', [InventoryController::class, 'updata'])->name('products.updata');
