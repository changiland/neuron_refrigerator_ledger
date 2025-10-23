import {Link} from '@inertiajs/react';



export default function MainLayout({children}) {
    return (
        <div className='box-border p-0 m-0 font-sans relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 list-none '>
            {children}
        </div>
    );
}
