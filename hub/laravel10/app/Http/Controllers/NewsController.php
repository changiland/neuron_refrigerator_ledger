<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use App\Models\News_type;
use SebastianBergmann\Environment\Console;

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

        return redirect()->back()->with('success', '新增成功');
    }

    public function index(Request $request)
    {
        // 在 DB 層做 join 排序，並取出 Eloquent 物件
        $news = News::join('news_type', 'news.types_id', '=', 'news_type.id')
        ->select('news.*', 'news_type.type_name')
        ->orderBy('news_type.id')
        ->orderBy('news.sort_order')
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
                'news' => $top5
            ]);
        }

    }
}
