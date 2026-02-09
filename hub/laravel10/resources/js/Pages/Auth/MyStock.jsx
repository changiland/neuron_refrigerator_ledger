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
                <main className="relative flex flex-col items-center  pt-[6em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <div className=" h-[100%] lg:h-[200px] w-[90vw] sm:w-[80vw] sm:max-w-[1000px] flex flex-col lg:flex-wrap justify-around  items-center mt-[20px] lg:w-[90%] ">
                        <div className="relative">
                            <Link href={route('StockInfo')} className="peer rounded-[15px] bg-blue-500 w-[20rem] h-[10rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-200 hover:text-white mx-[5px] my -[20px] " ><div className="[clip-path:polygon(0_0,60%_0,65%_20%,100%_20%,100%_100%,0_100%)] bg-blue-200 w-[100%] h-[100%] rounded-[15px] flex items-center justify-center hover:bg-blue-500">在庫状況</div></Link>
                            <div className="hidden peer-hover:block text-center text-gray-500 text-sm absolute top-[110%] left-1/2 -translate-x-1/2 w-[150px] bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10">
                                在庫状況を確認します

                            </div>

                        </div>
                        <div className="relative">
                            <Link href={route('ArrivalHistory')} className="peer rounded-[15px] bg-blue-500 w-[20rem] h-[10rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-200 hover:text-white mx-[5px] my-[20px]" ><div className="[clip-path:polygon(0_0,60%_0,65%_20%,100%_20%,100%_100%,0_100%)] bg-blue-200 w-[100%] h-[100%] rounded-[15px] flex items-center justify-center hover:bg-blue-500">入荷履歴</div></Link>
                            <div className="hidden peer-hover:block text-center text-gray-500 text-sm absolute top-[110%] left-1/2 -translate-x-1/2 w-[150px] bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10">
                                入荷履歴を確認します

                            </div>
                        </div>
                        <div className="relative">
                            <Link href={route('CostsHistory')} className="peer rounded-[15px] bg-blue-500 w-[20rem] h-[10rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-200 hover:text-white mx-[5px] my-[20px]" ><div className="[clip-path:polygon(0_0,60%_0,65%_20%,100%_20%,100%_100%,0_100%)] bg-blue-200 w-[100%] h-[100%] rounded-[15px] flex items-center justify-center hover:bg-blue-500">当月支払</div></Link>
                            <div className="hidden peer-hover:block text-center text-gray-500 text-sm absolute top-[110%] left-1/2 -translate-x-1/2 w-[150px] bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10">
                                当月支払を確認します

                            </div>
                        </div>
                    </div>
                    <div>
                        {/* 按鈕叫出彈窗 */}
                        <button  onClick={() => setOpen(true)} className="rounded-[15px] border-4 border-blue-400 bg-blue-300 w-[100px] h-[3rem] flex items-center justify-center mb-[60px] text-blue-800 font-bold hover:bg-blue-500 hover:text-white mt-[20px]" >
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
