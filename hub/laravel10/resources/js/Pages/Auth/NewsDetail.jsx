import MainLayout from '@/Layouts/MainLayout';
import {Link, Head} from '@inertiajs/react';




export default function NewsDetail({auth, news}){

    if (!news) {
        return <div>データ読み込み中...</div>;
    }
   //console.log(news);

    return (
        <>
            <Head title="お知らせ詳細" />
            <MainLayout auth={auth}>
                <main className="relative flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto h-full " >
                    {
                        <>
                            <h2 className="text-2xl font-bold mb-4">お知らせ詳細</h2>
                            <div className='flex flex-col w-full items-center'>
                                <div className=' w-[20em] rounded-lg border border-gray-300 flex justify-start mb-[5px]'>
                                    <div className="text-lg font-semibold ml-[5px] ">タイトル：</div>
                                    <div className="w-[10em] flex justify-center text-lg"> {news.title}</div>
                                </div>
                                <div className=' w-[20em] rounded-lg border border-gray-300 flex justify-start mb-[5px]'>
                                    <div className="text-lg font-semibold ml-[5px]">項目：</div>
                                    <div className="w-[10em] flex justify-center text-lg">
                                        {news.type_name}
                                    </div>
                                </div>
                                <div className=' w-[20em] rounded-lg border border-gray-300 flex justify-start mb-[5px]'>
                                    <div className="text-lg font-semibold ml-[5px]">日付：</div>
                                    <div className="w-[10em] flex justify-center text-lg">
                                        {news.published_at.substring(0, 10)}
                                    </div>
                                </div>
                                <div className="text-lg font-semibold ml-[55px] flex justify-start w-[20em] mb-[5px]">本文：</div>
                                <div className=' w-[20em] h-[300px] rounded-lg border border-gray-300 flex justify-start mb-[5px] '>
                                    <div className="mt-4 space-y-2 m-[10px]">
                                        {news.comment}
                                    </div>
                                </div>


                            </div>
                            {
                                auth.user ?
                                <div className="mt-4 flex">
                                    <Link href={route('MyStock')} className="rounded-[15px] border-4 border-blue-500 bg-blue-200 w-[10rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                        <p>情報ページへ</p>
                                    </Link>
                                    <Link href={route('News')} className="ml-4 rounded-[15px] border-4 border-blue-500 bg-blue-200 w-[10rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                        <p>ニュースページへ</p>
                                    </Link>
                                </div>
                                : <div className="mt-4 flex">
                                    <Link href={route('Welcome')} className="rounded-[15px] border-4 border-blue-500 bg-blue-200 w-[10rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                        <p>ホームページへ</p>
                                    </Link>
                                    <Link href={route('News')} className="ml-4 rounded-[15px] border-4 border-blue-500 bg-blue-200 w-[10rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                        <p>ニュースページへ</p>
                                    </Link>
                                </div>
                            }

                        </>

                    }
                </main>
            </MainLayout>
        </>
    )
}
