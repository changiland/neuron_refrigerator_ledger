import MainLayout from "@/Layouts/MainLayout";
import { Link, Head } from "@inertiajs/react";




export default function StockInfo({ auth }) {
    return (
        <>
            <Head title="詳細情報" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <div>
                        <table className=" shadow-[1px_0px_2px_1px_gray] w-[50vw] max-w-[500px] rounded-[20px] mt-[20px]" >
                            <caption >詳細情報</caption>
                            <thead >
                                <tr className=" h-[100px]">
                                    <th >項目</th>
                                    <th >食分</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr className=" h-[50px]">
                                    <td ><p className="flex justify-center">2025/10/10</p></td>
                                    <td ><p className="flex justify-center">Laravel1</p></td>
                                </tr>
                            </tbody>
                            <tfoot >
                                <tr className=" h-[50px]">
                                    <td colSpan="2" ><p className="flex justify-center">合計</p></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="h-[200px] w-[50vw] max-w-[500px] flex justify-around items-center mt-[20px]">
                        <div className="rounded-[15px] border-2 border-red-500 w-[100px]">
                            <Link href={route('ArrivalHistory')}><p className="flex justify-center">入荷履歴</p></Link>
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
