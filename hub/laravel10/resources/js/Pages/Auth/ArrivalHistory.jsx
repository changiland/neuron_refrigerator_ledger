import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { router } from "@inertiajs/react";



export default function ArrivalHistory({ auth, arrivalMonthly }) {

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



    useEffect(() => {

        router.get(
            route('ArrivalHistory', { month: currentDate.format("YYYY-MM") }),
            {},
            {
                preserveState: true,
                replace: true,
                onSuccess: (page) => {
                   setEvent(page.props.arrivalMonthly || []);

                },
            }
        );
    }, [currentDate.format("YYYY-MM")]);
    console.log(arrivalMonthly);

    const getEventCountByDay = (day) => {
        if (!day) return 0;

        const dateStr = currentDate
            .date(day)
            .format("YYYY-MM-DD");
        console.log(dateStr);
        return event.filter(e =>
            dayjs(e.created_at).format("YYYY-MM-DD") === dateStr
        ).length;
    };
    /*useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    route('ArrivalHistory', { month: newMonth })
                );
                if (response.ok) {
                    const data = await response.json();
                    setEvent(data.events);
                } else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [newMonth]);
    map 是「一對一」
    filter 是「留下或丟掉」
    reduce 是「重新組裝整個世界」 */

    /*const dateValue = event.reduce((acc, item) => {
        const date = dayjs(item.created_at).format("YYYY-MM-DD");

        acc[date] ??= [];
        acc[date].push(item);
        return acc;
    }, {})

    console.log(dateValue);*/

    return (
        <>
            <Head title="入荷履歴" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[6em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
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
                                    <Link href={route('ArrivalDetail', { date: currentDate.date(day).format("YYYY-MM-DD") }) } key={idx} { ...day ? {className: "inline-block w-[60px] h-[100px] text-center align-top leading-[50px] border border-gray-300 rounded-lg m-[1px] cursor-pointer"} : {className: "inline-block w-[60px] h-[100px] text-center align-top leading-[50px] border border-gray-300 rounded-lg m-[1px] bg-gray-300 cursor-pointer"}} >
                                        {day ? day : ""}
                                        {getEventCountByDay(day) > 0 && (
                                            <div className="mt-2">
                                                <span className="inline-block bg-blue-500 text-white text-xs px-1 rounded">
                                                    {getEventCountByDay(day)} 件のイベント
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-center items-center mt-[20px]">
                        <div className="mr-[1rem]">
                            <Link href={route('StockInfo')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">詳細情報</p></Link>
                        </div>
                        <div className="mr-[1rem]">
                            <Link href={route('CostsHistory')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">当月支払</p></Link>
                        </div>
                        <div>
                            <Link href={route('MyStock')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">情報ページ</p></Link>
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}
