import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';


export default function NewsView({news}) {

    //console.log(news);
    return (
        <>

            {news && news.map((item) => (
                <tr  key={item.types_id} className="p-[1px] border-b-[1px] divide-x-[1px] divide-white border-white w-[90vw] sm:w-[80vw] sm:max-w-[1000px]">
                    <td className="flex justify-center w-[100px]">{item.published_at.substring(0, 10)}</td>
                    <td onClick={() => router.visit(`/ニュース/${item.title}`)} className="pl-[10px] cursor-pointer">{item.title}</td>
                    <td className="flex justify-center w-[150px]">{item.type_name}</td>
                </tr>
            ))}
        </>
    );
}
