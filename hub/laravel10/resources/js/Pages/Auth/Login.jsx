import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Popup from "@/Components/Popup";




export default function Login({auth}) {
    const label = {
        Email: { for: "email", label: "メールアドレス", type: "email", name: "email", id:"email", required: true },
        Pw: { for: "password", label: "パスワード", type: "password", name: "password", id:"password", required: true }
    }

    const userFrom = useForm({
            email: '',
            password: '',
        });

    const { post, processing } = userFrom;

    const submit = (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防止

        post(route('login')); // 'login' ルートにフォームデータを送信
    };
    const [open, setOpen] = useState(false);

    const [resetEmail, setResetEmail ] = useState("");

    const [sending, setSending ] = useState(false);

    const handleMail = (e) => {
        setResetEmail(e.target.value);
    }

    const handleMailing = () => {
        if (!resetEmail || sending) return;

        setSending(true);
        router.post(route('user.store'), {
                email: resetEmail
            },
            {
                onFinish: () => setSending(false),
            }
        )
    }

    return (
        <>
            <Head title="ログイン" />
            <MainLayout auth={auth}>
                <Guest>
                <form onSubmit={submit}>
                    <InputDesign props={label} from={userFrom}/>
                    <div className="flex justify-center">
                        <button type="submit" disabled={processing} className="shadow-[1px_0px_2px_1px_gray] w-[10em] rounded-[20px] mt-[20px]">ログイン</button>
                    </div>
                </form>
                <div>
                        {/* 按鈕叫出彈窗 */}
                        <button type="button" onClick={() => setOpen(true)} className="ml-[7em] mt-[1em]" >
                            <p className="text-red-500 hover:text-red-800">パスワードが忘れた</p>
                        </button>
                        {/* 彈窗 */}
                        <Popup open={open} onClose={() => setOpen(false)}>
                            <h2 className="text-xl font-bold mb-4 text-center">メール登録</h2>
                            <div className="flex items-center space-x-4">
                                <input className="rounded-[15px] h-[2em] w-[70%]" type="email" onChange={handleMail} value={resetEmail}/>
                                <button className="rounded-[15px] h-[2em] shadow-xl bg-gray-100 w-[30%] hover:bg-gray-500 hover:text-white" type="button" onClick={handleMailing} disabled={sending} >{sending ? '送信中' : '送信する'}</button>
                            </div>

                        </Popup>
                    </div>
                </Guest>
            </MainLayout>
        </>

    );
}
