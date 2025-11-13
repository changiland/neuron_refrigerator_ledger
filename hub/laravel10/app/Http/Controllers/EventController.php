<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
//use App\Models\Event; // 假設你的資料表是 events


class EventController extends Controller
{
    //
    public function index(Request $request)
    {
        $date = $request->query('date'); // 接收傳來的日期 (例如 ?date=2025-11-10)

        // 依日期查詢資料庫
        /*$events = Event::query()
            ->when($date, fn($q) => $q->whereDate('event_date', $date))
            ->orderBy('event_date', 'desc')
            ->get();*/

        // 回傳給 Inertia 頁面
        return Inertia::render('Auth/ArrivalDetail', [
            'date' => $date,
            //'events' => $events,
        ]);
    }
}
