<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public homepage
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Member registration
Route::get('/register/member', [RegisteredUserController::class, 'createMember'])->name('register.member');
Route::post('/register/member', [RegisteredUserController::class, 'storeMember']);

// Buyer registration
Route::get('/register/buyer', [RegisteredUserController::class, 'createBuyer'])->name('register.buyer');
Route::post('/register/buyer', [RegisteredUserController::class, 'storeBuyer']);

// Pending approval page (after registration)
Route::get('/registration-pending', function () {
    return Inertia::render('Auth/RegistrationPending');
})->name('registration.pending');

// Dashboard (protected)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes (protected)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Include authentication routes (login, register, etc.)
require __DIR__.'/auth.php';