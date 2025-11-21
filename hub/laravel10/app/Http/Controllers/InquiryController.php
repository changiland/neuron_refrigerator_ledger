<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inquiry;
use App\Models\InquiryType;
use Inertia\Inertia;
use SebastianBergmann\Environment\Console;

class InquiryController extends Controller
{

    public function store(Request $request)
    {
        // 驗證輸入
        $request->validate([
            'types_id' => 'required|integer|exists:inquiry_types,id',
            'question' => 'required|string|max:255',
            'answer'   => 'required|string|max:1000',
        ]);

        // 使用 create() 新增資料，sort_order 會自動遞增
        Inquiry::create($request->only('types_id', 'question', 'answer'));

        return redirect()->back()->with('success', '新增成功');
    }

    public function index(Request $request)
    {
        // 在 DB 層做 join 排序，並取出 Eloquent 物件
        $inquiries = Inquiry::join('inquiry_types', 'inquiry.types_id', '=', 'inquiry_types.id')
        ->select('inquiry.*', 'inquiry_types.type_name')
        ->orderBy('inquiry_types.id')
        ->orderBy('inquiry.sort_order')
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

        // 只取前三筆
        $top3 = $inquiries->take(3);*/

        // 按 type_name 分組
        $grouped = $inquiries->groupBy('type_name');


        // 撈單一TABLE全部資料
        $inquirType = InquiryType::orderBy('type_name')->get();
         if ($request->routeIs('QandAForm')) {
        // 設計者表單頁
        return Inertia::render('Auth/QandAForm', [
            'inquirType' => $inquirType,
        ]);
        }
        return Inertia::render('Auth/QandA', [
            'grouped' => $grouped
        ]);
    }
}
