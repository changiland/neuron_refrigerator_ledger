import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import dayjs from "dayjs";
import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { set } from "zod";



export default function ArrivalHistory({ auth, monthly, transaction }) {

    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedMonth, setSelectedMonth] = useState("");


    let monthList = [];
    let costList = [{ name: "April費用" , cost: 50000}, { name: "May費用", cost: 45000}, {name: "June費用", cost: 60000}];
    let maxMonth;

    const thisMonth = currentMonth.month() + 1; // 現在の月までの月数を取得
    const thisYear = currentMonth.year();
    const currentYear = dayjs().year(); // 現在の年を取得

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
        const selected = e.target.value;
        setSelectedMonth(selected); // 選択された月を状態に保存

        const newMonth = selected
            .replace("年", "-")
            .replace("月", ""); // フォーマットを "YYYY-MM" に変換

        console.log(newMonth);

        router.get(
            route('CostsHistory'),
            {
                month: newMonth,
            },
            // preserveState / replace 技術的preserveState(保留畫面狀態)replace(不新增瀏覽器歷史)只發生在「畫面切換 / 篩選」時
            {
                preserveState: true, // ページ遷移時に状態を保持
                replace: true, // ブラウザの履歴を置き換える
            }
        );
    };

    const totalCost = useMemo(() => {
        return transaction.reduce(
            (sum, item) => sum + Number(item.cost || 0),
            0
        );
        }, [transaction]);

    const totalByProduct = useMemo(() => {
            return transaction.reduce((acc, item) => {
                const product = item.products?.name ?? "未分類";
                acc[product] = acc[product] || {
                    total: 0,
                    items: []
                };
                acc[product].total += Number(item.cost || 0);
                acc[product].items.push(item);
                return acc;
            }, {});
            }, [transaction]);

    console.log(monthly);
    console.log(transaction);

    return (
        <>
            <Head title="当月支払" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[6em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">当月支払</h2>
                    <div className="w-full">
                        <div className="w-full">
                            <label htmlFor="costView"></label>
                            <div className="w-full flex items-center justify-center mb-4">
                                <button onClick={prevPage} className="mx-[20px] w-[2rem] h-8 hover:bg-blue-400 hover:text-white">前</button>
                                <span className="mx-[30px] font-bold">{currentMonth.format("YYYY年")}</span>
                                <button onClick={nextPage} className="mx-[20px] w-[2rem] h-8 hover:bg-blue-400 hover:text-white">次</button>
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
                                    {Object.entries(totalByProduct).length === 0 ? (
                                        <p className="text-center font-bold">当月の支払記錄はありません。</p>
                                    ) : (
                                        Object.entries(totalByProduct).map(([product, data]) => (
                                            < label className="w-full cursor-pointer" key={product} >
                                                <input type="checkbox" className="peer hidden" />
                                                <div className="flex justify-between w-full border-4 m-[5px] px-[5px] rounded-lg border-blue-500 hover:bg-blue-200 peer-checked:bg-blue-500 peer-checked:text-white" >
                                                    <span className="min-w-[150px]">{product}:</span>
                                                    <span>{data.total}円
                                                    </span>
                                                </div>
                                                {data.items.map(item => (
                                                <div className="hidden peer-checked:block w-full border-2 m-[5px] rounded-lg mb-[10px] border-blue-300" key={item.id}>

                                                    <p className="flex justify-between w-[90%] mx-auto mt-[5px]" key={item.id}>
                                                        <span>{dayjs(item.created_at).format('YYYY年MM月DD日')}</span>
                                                        <span>{item.products.name}</span>
                                                        <span>{item.cost}円</span>
                                                    </p>

                                                </div>
                                                )) }
                                            </label>
                                        ))
                                    )}
                                    {/*costList.map((item, index) => (
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

                                    ))*/}
                                </section>
                                <div className="flex justify-end">
                                    <span className="font-bold">合計:</span>
                                    <span className="font-bold ml-[5px]">
                                        {totalCost.toLocaleString()}円
                                    </span> { /* 即時計算合計金額 */ }
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-center items-center mt-[20px]">
                        <div className="mr-[1rem]">
                            <Link href={route('StockInfo')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">詳細情報</p></Link>
                        </div>
                        <div className="mr-[1rem]">
                            <Link href={route('ArrivalHistory')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">入荷履歴</p></Link>
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
