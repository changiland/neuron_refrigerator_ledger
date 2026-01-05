import { Link, router } from '@inertiajs/react'; // 引入 Link 元件
import Login from '@/assets/login_black.png';
import QA from '@/assets/Q&A.png';
import Register from '@/assets/ユーザー画像.png';
import Logout from '@/assets/logout.png';
import Logo from '@/assets/logo.png';


export default function Header({auth}) {


    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/ログアウト'); // 送 POST /logout 到 Laravel
    }


    return (
        <>
            {/* Header */}
            <header className={`fixed top-0 left-0 w-screen z-50 p-4 flex justify-between items-center backdrop-blur-[5px] transition-all duration-300 ${auth.user ? 'bg-blue-500 shadow-md' : 'bg-transparent shadow-none'}`}>
                {
                    auth.user ? <h1 className="w-[50px] "><Link href={route('MyStock')}><img src={Logo} alt="" /></Link></h1> : <h1 className="w-[50px] "><Link href={route('Welcome')}><img src={Logo} alt="" /></Link></h1>
                }
                {
                    /* 導航連結 */
                    auth.user && <p className="text-gray-700">ようこそ、<span className="text-gray-700 font-bold">{auth.user.name}</span>さん</p>
                }
                <nav className="space-x-4 text-sm font-medium flex items-center px-[15px]">
                    <a href={route('QandA')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={QA} alt="" />Q&A</a>
                    {
                        auth.user ? <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Logout} alt="" />ログアウト</button> : <Link href={route('Login')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Login} alt="" />ログイン</Link>
                    }
                    {
                        auth.user ? <Link href={route('userInfo')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Register} alt="" />ユーザー</Link> : <Link href={route('register')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Register} alt="" />登録</Link>
                    }
                </nav>
            </header>
        </>

    );
}
