import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';





export default function News({auth}) {
    return (
        <>
            <Head title="お知らせ" />
            <MainLayout auth={auth}>
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
                            <tr className="p-[100px] border-b-[1px] divide-x-[1px] divide-white border-white ">
                                <td className="flex justify-center">2025/10/10</td>
                                <td className="pl-[10px]">Laravel1</td>
                                <td className="flex justify-center">Laravel2</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="border-t-[1px] border-white " ></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </MainLayout>
        </>
    );
}
