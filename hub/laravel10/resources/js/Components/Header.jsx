import { Link } from '@inertiajs/react'; // 引入 Link 元件



export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-screen bg-yellow-100 shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">My App</h1>
                <nav className="space-x-4 text-sm font-medium">
                    <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                    <Link href={route('login')} className="text-gray-700 hover:text-gray-900">Login</Link>
                    <Link href={route('register')} className="text-gray-700 hover:text-gray-900">Register</Link>
                </nav>
            </header>
        </>

    );
}
