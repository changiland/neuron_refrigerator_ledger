import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import dayjs from "dayjs";



export default function ArrivalHistory({ auth }) {

    const [currentDate, setCurrentDate] = useState(dayjs());
    const [event, setEvent] = useState([]);

    const startOfMonth = currentDate.startOf("month"); // 月初
    const endOfMonth = currentDate.endOf("month"); // 月末
    const daysInMonth = endOfMonth.date(); // 月の日数
    const startDay = startOfMonth.day(); // 月初の曜日（0:日曜, 1:月曜, ..., 6:土曜）
    const endDay = endOfMonth.day();
    console.log(endDay);


    const weeks = []; // 週ごとの日付を格納する配列
    let days = [];  // 1ヵ月間分の日付を格納する配列
    for (let i = 0; i < startDay; i++) days.push(null); // 月初までの空白を追加
    for (let d = 1; d <= daysInMonth; d++) days.push(d); // 月の日付を追加
    for (let i = 6; i > endDay; i--) days.push(null); // 月末以降の空白を追加
    while (days.length) weeks.push(days.splice(0, 7));  // 7日ごとに分割して週ごとに格納

    const weekDay = ["日", "月", "火", "水", "木", "金", "土"];

    const prevPage = () => {
        setCurrentDate(currentDate.subtract(1, "month"));
    };

    const nextPage = () => {
        setCurrentDate(currentDate.add(1, "month"));
    };

    return (
        <>
            <Head title="入荷履歴" />
            <MainLayout>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">入荷履歴一覧</h2>
                    <div className="w-full flex items-center justify-around mb-4">
                        <button onClick={prevPage}>前</button>
                        <span className="mx-4 font-bold">{currentDate.format("YYYY年MM月")}</span>
                        <button onClick={nextPage}>次</button>
                    </div>
                    <div className="w-full flex justify-center flex-wrap border border-gray-300 p-4 rounded-lg max-w-[1000px] max-h-[1000px]">
                        <div className="w-full mb-2 flex justify-around">
                            {weekDay.map((day) => (
                                <span key={day} className="inline-block w-[60px] text-center font-bold">
                                    {day}
                                </span>
                            ))}
                        </div>

                        {weeks.map((week) => (
                            <div key={week} className="mb-2 w-full flex justify-start justify-around">
                                {week.map((day, idx) => (
                                    <Link href={route('ArrivalDetail', { date: day }) } key={idx} className="inline-block w-[60px] h-[100px] text-center align-top leading-[50px] border border-gray-300 rounded-lg m-[1px] cursor-pointer">
                                        {day ? day : ""}
                                        {event.length ? (
                                            <div className="mt-2">
                                                <span className="inline-block bg-blue-500 text-white text-xs px-1 rounded">
                                                     {event.length} 件のイベント
                                                </span>
                                            </div>
                                        ) : null  }
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-around items-center mt-[20px]">
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('StockInfo')}><p className="flex justify-center">詳細情報</p></Link>
                        </div>
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('CostsHistory')}><p className="flex justify-center">当月支払</p></Link>
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}
