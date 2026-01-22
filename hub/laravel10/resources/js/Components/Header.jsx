import { Link, router } from '@inertiajs/react'; // 引入 Link 元件
import Login from '@/assets/login_black.png';
import QA from '@/assets/Q&A.png';
import Register from '@/assets/ユーザー画像.png';
import UserPage from '@/assets/ユーザー画像user.png';
import QA2 from '@/assets/help.png';
import Logout from '@/assets/logout.png';
import Logo from '@/assets/logo.png';
import Logo2 from '@/assets/logo2.png';
import { useState } from 'react';
import { set } from 'zod';


export default function Header({auth}) {

    const [Option, setOption] = useState('');
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/ログアウト'); // 送 POST /logout 到 Laravel
    }

    const handelChange = (e) => {
        const value = e.target.value;
        setOption(value);

        if (!value) return;
        const el = document.getElementById(value);
        if (!el) return;

        const headerHeight = 80; // 你的 fixed header 高度
        const elementRect = el.getBoundingClientRect();
        const elementTop = elementRect.top + window.scrollY;
        const elementHeight = elementRect.height;

        const viewportHeight = window.innerHeight;

        const scrollTo =
            elementTop
            - headerHeight
            - (viewportHeight / 2)
            + (elementHeight / 2);

        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth',
        });
    }


    return (
        <>
            {/* Header */}
            <header className={`fixed top-0 left-0 w-screen z-50 p-4 flex justify-between items-center backdrop-blur-[5px] transition-all duration-300 ${auth.user ? 'bg-blue-500 shadow-md' : 'bg-transparent shadow-none'}`}>
                {
                    auth.user ? <h1 className="w-[50px] "><Link href={route('MyStock')}><img src={Logo2} alt="" /></Link></h1> : <h1 className="w-[50px] "><Link href={route('Welcome')}><img src={Logo} alt="" /></Link></h1>
                }
                {
                    /* 導航連結 */
                    auth.user ? <p className="text-white">ようこそ、<span className="text-white font-bold mx-2">{auth.user.name}</span>さん</p> : <>
                    <select className=' sm:hidden border-0 bg-transparent shadow-none py-1 rounded-[10px]' onChange={handelChange} value={Option}>
                        <option  value="">メニュー</option>
                        <option value="home" >Home</option>
                        <option value="news">News</option>
                        <option value="aboutus">About Us</option>
                    </select>
                    <div className=' hidden sm:block'>
                        <nav className="space-x-4 text-sm font-medium flex items-center px-[15px]">
                            <a href="#home" className="text-black hover:text-gray-900">ホーム</a>
                            <a href="#news" className="text-black hover:text-gray-900">ニュース</a>
                            <a href="#aboutus" className="text-black hover:text-gray-900">私たちに関しては</a>
                        </nav>
                    </div>
                    </>
                }
                <nav className="space-x-4 text-sm font-medium flex items-center px-[15px]">
                    {
                        auth.user ? <a href={route('QandA')} className="text-white hover:text-gray-300 flex flex-col items-center"><img src={QA2} alt="" />Q&A</a> : <a href={route('QandA')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={QA} alt="" />Q&A</a>
                    }

                    {
                        auth.user ? <button onClick={handleLogout} className="text-white hover:text-gray-300 flex flex-col items-center"><img src={Logout} alt="" />ログアウト</button> : <Link href={route('Login')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Login} alt="" />ログイン</Link>
                    }
                    {
                        auth.user ? <Link href={route('userInfo')} className="text-white hover:text-gray-300 flex flex-col items-center"><img src={UserPage} alt="" />ユーザー</Link> : <Link href={route('register')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Register} alt="" />登録</Link>
                    }
                </nav>
            </header>
        </>

    );
}
