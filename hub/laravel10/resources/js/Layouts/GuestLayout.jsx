// 你的專案 LOGO 元件 resources/js/Components/ApplicationLogo.jsx
import ApplicationLogo from '@/Components/ApplicationLogo';
// Inertia.js 的 <Link> 元件（代替 <a> 標籤）作用是「不重新載入頁面」地在前端切換路由。
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
