import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import { object } from 'zod';



export default function QandA({auth, grouped}) {
    console.log(grouped);
    return (
        <>
            <Head title="Q&Aページ" />
            <MainLayout auth={auth}>
                <div className="min-h-screen flex flex-col items-center justify-around bg-gray-100 mt-10">
                    <h1 className="text-3xl font-bold mb-6">Q&A Page</h1>
                    {Object.entries(grouped).map(([key,item]) => (

                        <div key={key} className="mb-8">
                            <h1 className="text-2xl font-bold mb-4 capitalize">{key} の質問</h1>
                            {console.log(item)}
                            { item.map(values => (
                                <div key = {values.id}>
                                    <label className="cursor-pointer block">
                                        {/* checkbox peer hidden 一定要跟要控制的元素在同層 */}
                                        <input type="checkbox" name="faq" className="peer hidden" />
                                        {console.log(values)}
                                        {/* 問題區塊 */}
                                        <div className="mb-4 p-4 bg-white rounded-lg shadow w-[1000px] max-w-2xl transition duration-200 hover:bg-gray-50">
                                            <span className="text-sm text-gray-500 mb-2 block">Q{values.sort_order}</span>
                                            <h2 className="text-lg font-semibold mb-2 text-gray-800">
                                                {values.question}
                                            </h2>
                                        </div>

                                        {/* 答案區塊（只有當 radio 被選中時顯示） */}
                                        <div className="hidden peer-checked:block mb-4 p-4 bg-blue-50 rounded-lg shadow w-[1000px] max-w-2xl transition-all duration-300">
                                            <span className="text-sm text-blue-500 mb-2 block">A{values.sort_order}</span>
                                            <p className="text-gray-700">{values.answer}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <p className="text-lg text-gray-700">This is the Q&A page content.</p>
                </div>
            </MainLayout>
        </>
    );
}
