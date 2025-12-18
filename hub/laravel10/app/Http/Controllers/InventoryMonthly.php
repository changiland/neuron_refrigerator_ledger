<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\InventoryMonthly as InventoryMonthlyModel;
use App\Models\inventoryTransaction;
use Inertia\Inertia;

class InventoryMonthly extends Controller
{
    //
    public function index(Request $request)
    {
        $id = Auth::id();
        $monthly = InventoryMonthlyModel::where('user_id', $id)
            ->where('month', $request->month)
            ->get();

        $transaction = inventoryTransaction::with('products')
            ->where('user_id', $id)
            ->whereYear('created_at', substr($request->month, 0, 4))
            ->whereMonth('created_at', substr($request->month, 5, 2))
            // ->where('created_at','like', $request->month.'%')
            ->get();
        return Inertia::render('Auth/CostsHistory', [
            'monthly' => $monthly,
            'transaction' => $transaction,
        ]);
    }
}
