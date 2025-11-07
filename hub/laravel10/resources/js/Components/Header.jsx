import { Link } from '@inertiajs/react'; // 引入 Link 元件
import Login from '@/assets/login_black.png';
import QA from '@/assets/Q&A.png';
import Register from '@/assets/ユーザー画像.png';


export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-screen bg-yellow-100 shadow p-4 flex justify-between items-center z-50">
                <h1 className="text-xl font-bold text-gray-800"><Link href={route('Welcome')}>My App</Link></h1>
                <nav className="space-x-4 text-sm font-medium flex items-center px-[15px]">
                    <a href={route('QandA')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={QA} alt="" />Q&A</a>
                    <Link href={route('Login')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Login} alt="" />ログイン</Link>
                    <Link href={route('register')} className="text-gray-700 hover:text-gray-900 flex flex-col items-center"><img src={Register} alt="" />登録</Link>
                </nav>
            </header>
        </>

    );
}
