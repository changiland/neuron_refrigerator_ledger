import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";





export default function ArrivalDetail({ date, events, auth }) {

     return (
        <>
            <Head title="入荷詳細" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">入荷詳細</h2>
                    <div className="text-lg font-semibold">選択日付：{date ? date : "未選択"}</div>
                    <div className="mt-4 space-y-2">
                        {/*events.length ? (
                            events.map((event, index) => (
                                <div key={index} className="p-2 border rounded">
                                    <div>商品名：{event.name}</div>
                                    <div>数量：{event.amount}</div>
                                    <div>日付：{event.event_date}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">該当データがありません</div>
                        )*/}
                    </div>
                </main>
            </MainLayout>
        </>
    );
}
