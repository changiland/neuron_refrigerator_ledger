import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";



export default function ArrivalHistory({ auth }) {
    return (
        <>
            <Head title="入荷履歴" />
            <MainLayout>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">入荷履歴</h2>
                    <table className=" shadow-[1px_0px_2px_1px_gray] w-[50vw] max-w-[500px] rounded-[20px] mt-[20px]" >
                        <caption >入荷履歴一覧</caption>
                        <thead >
                            <tr className=" h-[100px]">
                                <th >入荷日</th>
                                <th >食分</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className=" h   -[50px]">
                                <td ><p className="flex justify-center">2025/10/10</p></td>
                                <td ><p className="flex justify-center">Laravel1</p></td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </MainLayout>
        </>
    );
}
