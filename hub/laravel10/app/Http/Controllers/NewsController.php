<?php

namespace App\Http\Controllers;

use App\Models\categories;
use App\Models\InventoryStock;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use App\Models\News_type;
use SebastianBergmann\Environment\Console;
use Illuminate\Support\Facades\Auth;
use App\Models\Products;

class NewsController extends Controller
{
    //
    public function store(Request $request)
    {
        // 驗證輸入
        $request->validate([
            'types_id' => 'required|integer|exists:news_type,id',
            'published_at' => 'required|date',
            'title' => 'required|string|max:255',
            'comment'   => 'required|string|max:1000',
        ]);

        // 使用 create() 新增資料，sort_order 會自動遞增
        News::create($request->only('types_id', 'published_at', 'title', 'comment'));

        return redirect()->back()->with('success', '新增成功'); // redirect()->back()
                                                               // 將使用者重新導回 上一頁（就是發送表單的那個頁面）。
                                                               // ->with('success', '新增成功')
                                                               // 帶一個「臨時訊息」給下一個請求（flash message）。
    }

    public function index(Request $request)
    {
        // 在 DB 層做 join 排序，並取出 Eloquent 物件
        $news = News::join('news_type', 'news.types_id', '=', 'news_type.id')
        ->select('news.*', 'news_type.type_name')
        ->orderBy('news_type.id') // 新聞類別（news_type）的 id 來排序
        ->orderBy('news.sort_order') // 在 同一個類別內，按照 news.sort_order 排序。
        ->get();
        //->paginate(20); // 資料過大分頁

        // 轉成陣列
        //$inquiriesArray = $inquiries->toArray(); // 前端

        // 轉成 JSON
        //$inquiriesJson = $inquiries->toJson(); //API

        // 過濾 sort_order > 10 的資料
        /*$filtered = $inquiries->filter(function($item) {
            return $item->sort_order > 10;
        });

        // 按 type_name 分組
        $grouped = $inquiries->groupBy('type_name');*/

        // 只取前三筆
        $top3 = $news->take(3);

        $top5 = $news->take(5);
        //dump($top3);
        //dd($top3);

        $id = Auth::id();
        /* $product = Products::query()
            ->with('category')
            ->whereIn('user_id', [$id])
            ->orWhereNull('user_id')
            ->get();

        $categories = Products::with('category')
            ->where(function ($q) use ($id) {
                $q->where('user_id', $id)
                ->orWhereNull('user_id');
            })
            ->get();*/
        $categories = categories::with(['products' => function ($q) use ($id) { // 先篩選 products
            $q->where(function ($qq) use ($id) { // 篩選有包含該使用者產品或沒有產品
                $qq->where('user_id', $id)
                ->orWhereNull('user_id');
            });
        }])
        ->where(function ($q) use ($id) { // 篩選有包含該使用者產品或沒有產品的分類
            $q->whereHas('products', function ($qq) use ($id) { // 篩選有包含該使用者產品或沒有產品
                $qq->where('user_id', $id)
                ->orWhereNull('user_id');
            })
            ->orDoesntHave('products');
        })
        ->get();
        /*$categories = categories::leftJoin('products', function ($join) use ($id) {
                $join->on('categories.id', '=', 'products.category_id')
                    ->where(function ($q) use ($id) {
                        $q->where('products.user_id', $id)
                        ->orWhereNull('products.user_id');
                    });
            })
            ->select('categories.*')
            ->distinct()
            ->orderBy('categories.category_name')
            ->get();*/
        $stocks = InventoryStock::with([
            'product' => function ($q) use ($id) {
                $q->where(function ($qq) use ($id) {
                    $qq->where('user_id', $id)
                    ->orWhereNull('user_id');
                })
                ->with([
                    'category' => function ($qc) use ($id) {
                        $qc->where(function ($qcc) use ($id) {
                            $qcc->where('user_id', $id)
                                ->orWhereNull('user_id');
                        });
                    }
                ]);
            }
        ])
        ->where('user_id', $id)
        ->get();


        // dd($categories);
        // 撈單一TABLE全部資料
        $news_type = News_type::orderBy('type_name')->get();
         if ($request->routeIs('NewsForm')) {
        // 設計者表單頁
        return Inertia::render('Auth/NewsForm', [
            'news_type' => $news_type,
        ]);
        }
        if ($request->routeIs('News')) {
            return Inertia::render('Auth/News', [
                'news' => $news
            ]);
        }
        if ($request->routeIs('Welcome')) {
            return Inertia::render('Welcome', [
            'news' => $top3,
        ]);
        }
        if ($request->routeIs('MyStock')) {
            return Inertia::render('Auth/MyStock', [
                'news' => $top5,
                'categories' => $categories,
                'stocks' => $stocks
            ]);
        }

    }

    public function show($title)
    {
        $news = News::join('news_type', 'news.types_id', '=', 'news_type.id') // 把兩個資料表連結起來
        ->select('news.*', 'news_type.type_name as type_name') // 選擇要取回哪些欄位
        ->where('news.title', $title) // 用 title 當搜尋條件
        ->firstOrFail(); // 取出第一筆資料

        return Inertia::render('Auth/NewsDetail', [
            'news' => $news
        ]);
    }
}
