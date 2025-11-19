import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import dayjs from "dayjs";



export default function ArrivalHistory({ auth }) {

    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedMonth, setSelectedMonth] = useState("");


    let monthList = [];
    let costList = [{ name: "April費用" , cost: 50000}, { name: "May費用", cost: 45000}, {name: "June費用", cost: 60000}];
    let maxMonth;

    const thisMonth = currentMonth.month() + 1; // 現在の月までの月数を取得
    const thisYear = currentMonth.year();
    const currentYear = dayjs().year(); // 現在の年を取得
    let newMonth;

    maxMonth =  thisYear === currentYear ? thisMonth : 12 ; // その年の最大月数を決定

    for (let m = 0; m < maxMonth; m++) {
            monthList.push(currentMonth.startOf("year").add(m, "month").format("YYYY年MM月"));// 各月のフォーマットを整えて配列に追加
        }


    const prevPage = () => {

        setCurrentMonth(currentMonth.subtract(1, "year")); // 前の年に移動
    };

    const nextPage = () => {
        const nextMonth = currentMonth.add(1, "year"); // 次の年の月を計算
        if (nextMonth.year() > currentYear) {
            console.log("已達當前年份，無法再前進");
            return;
        } // 現在の年を超えないように制限
        setCurrentMonth(currentMonth.add(1, "year")); // 次の年に移動
    };

    const handleChange = (e) => {
        newMonth = setSelectedMonth(e.target.value); // 選択された月に更新
        console.log(newMonth);
    };


    return (
        <>
            <Head title="当月支払" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">当月支払</h2>
                    <div className="w-full">
                        <div className="w-full">
                            <label htmlFor="costView"></label>
                            <div className="w-full flex items-center justify-center mb-4">
                                <button onClick={prevPage} className="mx-[20px]">前</button>
                                <span className="mx-[30px] font-bold">{currentMonth.format("YYYY年")}</span>
                                <button onClick={nextPage} className="mx-[20px]">次</button>
                            </div>
                            <div className="flex justify-center mt-4">
                                <select name="costView" id="costView" onChange={handleChange} value={selectedMonth}>
                                    <option value="">-- 選擇月份 --</option>
                                    {monthList.map((month, index) => (
                                        <option key={index} value={month} >{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 w-full max-w-[500px] flex flex-col mx-auto ">
                                <div className="flex justify-center">{selectedMonth}</div>
                                <section className="mt-2 w-full max-w-[1000px] flex flex-col items-center">
                                    {costList.map((item, index) => (
                                        < label className="w-full cursor-pointer" key={index} >
                                            <input type="checkbox" className="peer hidden" />
                                            <div className="flex justify-between w-full border m-[5px] px-[5px] rounded-lg">
                                                <span>{item.name}:</span>
                                                <span>{item.cost}円</span>
                                            </div>
                                            <div className="hidden peer-checked:block w-full border m-[5px] rounded-lg pb-[10px]">
                                                <p className="w-[90%] mx-auto mt-[5px]">
                                                    詳細情報: {item.name}の支払金額は{item.cost}円です。
                                                </p>
                                            </div>
                                        </label>

                                    ))}
                                </section>
                                <div className="flex justify-end">
                                    <span className="font-bold">合計:</span>
                                    <span className="font-bold ml-[5px]">
                                        {(() => {
                                            let sum = 0;
                                            costList.forEach(item => sum += item.cost);
                                            return sum;
                                        })()}円
                                    </span> { /* 即時計算合計金額 */ }
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-around items-center mt-[20px]">
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('StockInfo')}><p className="flex justify-center">詳細情報</p></Link>
                        </div>
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('ArrivalHistory')}><p className="flex justify-center">入荷履歴</p></Link>
                        </div>

                    </div>
                </main>
            </MainLayout>
        </>
    );
}
