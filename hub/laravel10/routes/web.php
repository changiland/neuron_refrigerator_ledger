<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('Welcome');

Route::get('/Register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/QandA', function () {
    return Inertia::render('Auth/QandA');
})->name('QandA');

Route::get('/Login', function () {
    return Inertia::render('Auth/Login');
})->name('Login');

Route::get('/News', function () {
    return Inertia::render('Auth/News');
})->name('News');

Route::get('/MyStock', function () {
    return Inertia::render('Auth/MyStock');
})->name('MyStock');

Route::get('/MyStock/StockInfo', function () {
    return Inertia::render('Auth/StockInfo');
})->name('StockInfo');

Route::get('/MyStock/ArrivalHistory', function () {
    return Inertia::render('Auth/ArrivalHistory');
})->name('ArrivalHistory');

Route::get('/MyStock/ArrivalHistory', function () {
    return Inertia::render('Auth/ArrivalHistory');
})->name('ArrivalHistory');

Route::get('/MyStock/CostsHistory', function () {
    return Inertia::render('Auth/CostsHistory');
})->name('CostsHistory');

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});*/

require __DIR__.'/auth.php';
