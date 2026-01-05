import StockView from "@/Components/StockView";
import MainLayout from "@/Layouts/MainLayout";
import { Link, Head } from "@inertiajs/react";




export default function StockInfo({ auth, inventory }) {
    return (
        <>
            <Head title="詳細情報" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <div>
                        <table className=" shadow-[1px_0px_2px_1px_blue] w-[50vw] max-w-[500px] rounded-[20px] mt-[20px]" >
                            <caption >詳細情報</caption>
                            <StockView inventory={inventory} />
                            <tfoot >
                                {/* <tr className=" h-[50px]">
                                    <td colSpan="2" ><p className="flex justify-center">合計{inventory.reduce((total, item) => total + (item.quantity || 0), 0)}</p></td>
                                </tr>
                                inventory.reduce(...)：遍歷陣列，把每個元素累加到 total 上。
                                (item.quantity || 0)：如果 item.quantity 是 null、undefined 或 0，就用 0。
                                0（最後一個參數）：total 的初始值.*/}
                                <tr className=" h-[50px] border-t-2 border-blue-500">
                                    <td colSpan="2" ><p className="flex justify-center">合計 <span className="font-bold mx-[10px]">{inventory.length}</span> つデータ</p></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-center items-center mt-[20px]">
                        <div className="mr-[1rem]">
                            <Link href={route('ArrivalHistory')}><p className="rounded-[25px] border-4 border-blue-500 bg-blue-200 w-[9rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">入荷履歴</p></Link>
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
