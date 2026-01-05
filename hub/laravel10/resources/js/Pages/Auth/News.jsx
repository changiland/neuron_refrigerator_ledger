import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import NewsView from '@/Components/NewsView';





export default function News({auth, news}) {

    return (
        <>
            <Head title="お知らせ" />
            <MainLayout auth={auth}>
                <main className="flex flex-col items-center  pt-[5em] pb-[5em] space-y-6 max-w-[1100px] w-[100%] mx-auto ">
                    <h2 className="text-2xl font-bold mb-4">最新情報</h2>
                    <div>
                        <table className=' table-fixed shadow-xl w-[90vw] sm:w-[80vw] sm:max-w-[1000px] rounded-[15px] bg-gray-100 '>
                            <caption className='bg-blue-100 border-b-[1px] border-white rounded-t-[15px]'>最新情報</caption>
                            <thead>
                                <tr className='p-[100px] border-b-[1px] divide-x-[1px] divide-white border-white '>
                                    <th  className='w-[100px]'>日時</th>
                                    <th  className=''>内容</th>
                                    <th  className='w-[150px]'>項目</th>
                                </tr>
                            </thead>
                            <tbody>
                                <NewsView news={news}>
                                </NewsView>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="3" className="border-t-[1px] border-white " ></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    {
                        auth.user ?
                        <div className="mt-4">
                            <Link href={route('MyStock')} className="rounded-[15px] border-4 border-blue-500 bg-blue-200 w-[20rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                <p>情報ページへ</p>
                            </Link>
                        </div>
                        : <div className="mt-4">
                            <Link href={route('Welcome')} className="rounded-[15px] border-2 border-blue-500 bg-blue-200 w-[20rem] h-[3rem] flex items-center justify-center text-blue-800 font-bold hover:bg-blue-500 hover:text-white">
                                <p>ホームページへ</p>
                            </Link>
                        </div>
                    }
                </main>
            </MainLayout>
        </>
    );
}
