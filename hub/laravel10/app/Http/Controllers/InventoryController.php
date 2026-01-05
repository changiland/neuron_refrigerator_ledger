<?php

namespace App\Http\Controllers;

use App\Models\categories;
use App\Models\InventoryBatches;
use App\Models\InventoryMonthly;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\InventoryStock;
use App\Models\inventoryTransaction;
use App\Models\Products;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = Categories::whereNull('user_id')->get(); // 取得所有沒有 user_id 的分類
        return Inertia::render('Auth/AdminProduct', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $id = Auth::id();
        DB::transaction(function () use ($request, $id) {
            if ((int)$request->type_id===0) {
                $type = categories::create([
                    'user_id' => $id,
                    'name' => $request-> type_name,
                    'parent_id' => null,
                    'is_active' => true,
                ]);
                $type_id = $type->id;
            } else {
                $type_id = $request->type_id;
            }
            if ((int)$request-> category_id===0) {
                $category = categories::create([
                    'user_id' => $id,
                    'name' => $request-> category_name,
                    'parent_id' => $type_id,
                    'is_active' => true,
                ]);
                $category_id = $category->id;
            } else {
                $category_id = $request-> category_id;
            }
            if ($id !== null) {
                if ((int)$request-> fname_id===0) {
                    $product = Products::create([
                        'user_id' => $id,
                        'name' => $request-> fname,
                        'category_id' => $category_id,
                        'is_active' => true,
                    ]);
                    $fname =  $product->id;
                } else {
                    $fname = $request-> fname_id;
                }
                // 交易紀錄

                inventoryTransaction::create([
                    'user_id' => $id,
                    'product_id' => $fname,
                    'quantity' => $request-> meal,
                    'type' => 'in',
                    'portion_sizes' => $request-> meal,
                    'cost' => $request-> cost,
                    'expiration_date' => $request-> expiration_date,
                ]);
                // 更新或建立庫存記錄
                InventoryBatches::create([
                    'user_id' => $id,
                    'product_id' => $fname,
                    'batch_id' => (string) Str::uuid(), // uniqid('batch_'),可用但不夠好的方法 'batch_id' => 'B' . now()->format('YmdHis') . '-' . random_int(1000, 9999),
                    'quantity' => $request-> meal,
                    'cost' => $request-> cost,
                    'expiration_date' => $request-> expiration_date,
                    'is_active' => true,
                ]);
                // 更新或建立月度分類帳記錄
                $stock = InventoryStock::firstOrCreate(
                    [
                        'user_id' => $id,
                        'product_id' => $fname,
                    ],
                    [
                        'quantity' => 0,
                    ]
                );
                $stock->increment('quantity', $request-> meal);
                // 月度分類帳
                $monthly = InventoryMonthly::firstOrCreate(
                    [
                        'user_id' => $id,
                        'product_id' => $fname,
                        'month' => date('Y-m'),
                    ],
                    [
                        'transactions_in' => 0,
                        'value_in' => 0,
                    ]
                );
                $monthly->increment('transactions_in', $request-> meal);
                $monthly->increment('value_in', $request-> cost * $request-> meal);
            }
        });
        return redirect()->back()->with('success', '新增成功');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
        $id = Auth::user()->id;
        $inventory = InventoryStock::with('product')->where('user_id', $id)->get(); // 根據使用者 ID 查找庫存記錄
        return Inertia::render('Auth/StockInfo', [
            'inventory' => $inventory
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $id = Auth::id();
        DB::transaction(function () use ($request, $id) {
                // 扣批次（FIFO）
            $remaining = $request->meal;

            $batches = InventoryBatches::where('user_id', $id)
                ->where('product_id', $request->fname_id)
                ->where('is_active', true)
                ->orderByRaw('expiration_date IS NULL')
                ->orderBy('expiration_date')
                ->lockForUpdate()
                ->get();

            foreach ($batches as $batch) {
                if ($remaining <= 0) break;

                $deduct = min($batch->quantity, $remaining);
                $batch->decrement('quantity', $deduct);

                if ($batch->quantity <= 0) {
                    $batch->update(['is_active' => false]);
                }

                $remaining -= $deduct;
            }

            if ($remaining > 0) {
                throw new \Exception('庫存不足');
            }

            // 更新總庫存（減）
            $stock = InventoryStock::where('user_id', $id)
                ->where('product_id', $request->fname_id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($stock->quantity < $request->meal) {
                throw new \Exception('總庫存不足');
            }

            $stock->decrement('quantity', $request->meal);

            inventoryTransaction::create([
                'user_id' => $id,
                'product_id' => $request-> fname_id,
                'quantity' => $request-> meal,
                'type' => 'out',
                'portion_sizes' => $request-> meal,
                'cost' => null,
                'expiration_date' => null,
            ]);
        });
        return redirect()->back()->with('success', '出庫成功');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
