import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';


export default function NewsView({news}) {

    //console.log(news);
    return (
        <>

            {news && news.map((item) => (
                <tr  key={item.types_id} className="p-[100px] border-b-[1px] divide-x-[1px] divide-white border-white ">
                    <td className="flex justify-center">{item.published_at.substring(0, 10)}</td>
                    <td className="pl-[10px]">{item.title}</td>
                    <td className="flex justify-center">{item.type_name}</td>
                </tr>
            ))}
        </>
    );
}
