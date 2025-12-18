<?php

namespace App\Http\Controllers;

use App\Models\inventoryTransaction;
use Faker\Provider\Internet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class ArrivalInventory extends Controller
{
    //
    public function index(Request $request)
    {
        $id = Auth::id();
        $currentMonth = $request->month?? now()->format('Y-m');
        $carbonMonth = Carbon::createFromFormat('Y-m', $currentMonth);
        // dd($currentMonth);
        $arrivalMonthly = inventoryTransaction::with('products')
            ->where('user_id', $id)
            ->where('type', 'in')
            ->whereYear('created_at', $carbonMonth->year)
            ->whereMonth('created_at', $carbonMonth->month)
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Auth/ArrivalHistory', [
            'arrivalMonthly' => $arrivalMonthly,
        ]);
    }

    public function show(Request $request)
    {
         $id = Auth::id();
         $date = Carbon::parse($request->date);
         $arrivalDate = inventoryTransaction::with('products')
            ->where('user_id', $id)
            ->where('type', 'in')
            //->whereDate('created_at', $date->format('Y-m-d'))
            ->whereYear('created_at', $date->year)
            ->whereMonth('created_at', $date->month)
            ->whereDay('created_at', $date->day)
            ->orderBy('created_at', 'desc')
            ->get();

            return Inertia::render('Auth/ArrivalDetail', [
            'arrivalDate' => $arrivalDate,
            'date' => $date
        ]);

    }
}
