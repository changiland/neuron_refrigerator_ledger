import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState } from "react";
import  dayjs  from "dayjs";





export default function ArrivalDetail({date, arrivalDate, auth }) {
    console.log(arrivalDate);
    const day = dayjs(date).format('YYYY-MM-DD');
    /*const [dateArrival, setDateArraval] = useState();
    });*/
     return (
        <>
            <Head title="入荷詳細" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full ">
                    <h2 className="text-2xl font-bold mb-4">入荷詳細</h2>
                    <div className="text-lg font-semibold">選択日付：{day ? day : "未選択"}</div>
                    <div className="mt-4 space-y-2 ">
                        {arrivalDate.length ? (
                            arrivalDate.map((event) => (
                                <div key={event.id} className="p-2 border rounded w-[30vw] ">
                                    <div>商品名：{event.products.name}</div>
                                    <div>数量：{event.quantity}</div>
                                    <div>日付：{event.expiration_date? event.expiration_date : '期限なし'}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">該当データがありません</div>
                        )}
                    </div>
                </main>
            </MainLayout>
        </>
    );
}
