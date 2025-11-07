import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';



export default function QandA() {

    const categoryLabels = {
        general: "一般質問",
        account: "アカウント関連",
        system: "システム設定",
        support: "サポート情報"
    };

    const data = {
        general: [
            { id: 1, question: "これは何ですか？", answer: "これはサンプルの質問です。" },
            { id: 2, question: "どのように使いますか？", answer: "簡単に使えます！" },
        ],
        account: [
            { id: 3, question: "パスワードを忘れた場合？", answer: "再設定リンクをメールで送信します。" },
        ],
        system: [
            { id: 4, question: "システム要件は？", answer: "最新のブラウザを推奨します。" },
        ],
        support: [
            { id: 5, question: "サポートに連絡するには？", answer: "お問い合わせフォームをご利用ください。" },
        ],
    };

    return (
        <>
            <Head title="Q&Aページ" />
            <MainLayout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-10">
                    <h1 className="text-3xl font-bold mb-6">Q&A Page</h1>
                    {Object.entries(data).map(([category, items]) => (
                        <div key={category} className="mb-8">
                            <h1 className="text-2xl font-bold mb-4 capitalize">{categoryLabels[category] || category} の質問</h1>
                            {items.map((item) => (
                                <div key={item.id}>
                                    <label className="cursor-pointer block">
                                        {/* checkbox peer hidden 一定要跟要控制的元素在同層 */}
                                        <input type="checkbox" name="faq" className="peer hidden" />

                                        {/* 問題區塊 */}
                                        <div className="mb-4 p-4 bg-white rounded-lg shadow w-[1000px] max-w-2xl transition duration-200 hover:bg-gray-50">
                                            <span className="text-sm text-gray-500 mb-2 block">Q{item.id}</span>
                                            <h2 className="text-lg font-semibold mb-2 text-gray-800">
                                                {item.question}
                                            </h2>
                                        </div>

                                        {/* 答案區塊（只有當 radio 被選中時顯示） */}
                                        <div className="hidden peer-checked:block mb-4 p-4 bg-blue-50 rounded-lg shadow w-[1000px] max-w-2xl transition-all duration-300">
                                            <span className="text-sm text-blue-500 mb-2 block">A{item.id}</span>
                                            <p className="text-gray-700">{item.answer}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <p className="text-lg text-gray-700">This is the Q&A page content.</p>
                </div>
            </MainLayout>
        </>
    );
}
