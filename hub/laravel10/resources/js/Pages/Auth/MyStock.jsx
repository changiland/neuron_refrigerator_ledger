import { Link, Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import NewsComp from "@/Components/NewsComp";
import Popup from "@/Components/Popup";
import { useState } from "react";
import dayjs from "dayjs";
import Transaction from "@/Components/Transaction";



export default function MyStock({ auth, news, categories }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Head title="在庫食材" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-around items-center mt-[20px]">
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('StockInfo')}><p className="flex justify-center">在庫状況</p></Link>
                        </div>
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('ArrivalHistory')}><p className="flex justify-center">入荷履歴</p></Link>
                        </div>
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('CostsHistory')}><p className="flex justify-center">当月支払</p></Link>
                        </div>
                    </div>
                    <div>
                        {/* 按鈕叫出彈窗 */}
                        <button  onClick={() => setOpen(true)} className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <p className="flex justify-center">発注</p>
                        </button>
                        {/* 彈窗 */}
                        <Popup open={open} onClose={() => setOpen(false)}>
                            <h2 className="text-xl font-bold mb-4">設定內容</h2>
                            <Transaction categories={categories}/>
                        </Popup>
                    </div>
                    <NewsComp news={news}/>
                </main>
            </MainLayout>
        </>
    );
}
