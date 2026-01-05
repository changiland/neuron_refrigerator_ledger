import { Link, Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import NewsComp from "@/Components/NewsComp";
import Popup from "@/Components/Popup";
import { useState } from "react";
import dayjs from "dayjs";
import Transaction from "@/Components/Transaction";
import OutTransaction from "@/Components/OutTransaction";



export default function MyStock({ auth, news, categories, stocks }) {

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('buy'); // buy | cost

    return (
        <>
            <Head title="在庫食材" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex flex-col justify-around  items-center mt-[20px]">
                        <div >
                            <Link href={route('StockInfo')}><p className="rounded-[15px] bg-blue-200 w-[20rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white" >在庫状況</p></Link>
                        </div>
                        <div >
                            <Link href={route('ArrivalHistory')}><p className="rounded-[15px] bg-blue-200 w-[20rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white" >入荷履歴</p></Link>
                        </div>
                        <div >
                            <Link href={route('CostsHistory')}><p className="rounded-[15px] bg-blue-200 w-[20rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white" >当月支払</p></Link>
                        </div>
                    </div>
                    <div>
                        {/* 按鈕叫出彈窗 */}
                        <button  onClick={() => setOpen(true)} className="rounded-[15px] border-4 border-blue-400 bg-blue-300 w-[100px] h-[3rem] flex items-center justify-center mb-4 text-blue-800 font-bold hover:bg-blue-500 hover:text-white" >
                            <p >発注</p>
                        </button>
                        {/* 彈窗 */}
                        <Popup open={open} onClose={() => setOpen(false)}>
                            <h2 className="text-xl font-bold mb-4">情報登録</h2>

                            <div className="flex flex-col w-full">

                                {/* Tabs */}
                                <div className="flex gap-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('buy')}
                                    className={`flex-1 py-2 rounded-t-lg
                                    ${activeTab === 'buy'
                                        ? 'bg-sky-400 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    購入
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('cost')}
                                    className={`flex-1 py-2 rounded-t-lg
                                    ${activeTab === 'cost'
                                        ? 'bg-sky-400 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    支出
                                </button>
                                </div>

                                {/* Content */}
                                <div className="bg-sky-100 p-4 rounded-b-lg">
                                {activeTab === 'buy' && (
                                    <Transaction categories={categories} />
                                )}

                                {activeTab === 'cost' && (
                                    <OutTransaction stocks={stocks} />
                                )}
                                </div>

                            </div>
                        </Popup>
                    </div>
                    <NewsComp news={news}/>
                </main>
            </MainLayout>
        </>
    );
}
