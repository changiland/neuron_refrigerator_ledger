import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Popup from "@/Components/Popup";
import { useForm } from "@inertiajs/react";



export default function UserInfo({ auth, user }) {

    console.log(user);

    const [isEditingNamme, setIsEditingName] = useState(false);
    const [name, setName] = useState(user.name);
    const [passWClick, setPassWClick] = useState(false);

    const handleClick = () => {
        isEditingNamme ? saveName() : setIsEditingName(!isEditingNamme);
    }

    const saveName = () => {
        router.post(route('userinfo.store'), {
            name: name,
        },
        {
            onFinish: () => setIsEditingName(false),
        } );
    }

    const handleChange = (e) => {
        setName(e.target.value);

    }

    const cancelClick = () => {
        setIsEditingName(!isEditingNamme);
    }
    console.log(name);

    const [open, setOpen] = useState(false);
    const {data, setData, put, processing, reset} = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const sendPassword = (e) => {

        e.preventDefault();

        put(route('password.update'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            }
        });
    }


    return (
        <>
            <Head title="ユーザー情報" />
            <MainLayout auth={auth}>

                <main className="relative w-[500px] pt-[5em]">
                    <h1 className="flex justify-center text-2xl font-bold mb-4">個人情報ページ</h1>
                    <div className="flex p-2 w-[40rem]">
                        <h3 className="px-[10px] py-2">name:</h3>
                        {isEditingNamme ? <input className="border p-2 rounded-[15px] w-[80%]" onChange={handleChange} value={name}/> :  <p className="border p-2 rounded-[15px] w-[21em]">{name}</p> }

                        <button className="w-[20%] bg-blue-300 border rounded-[15px] mx-3" onClick={handleClick}>{isEditingNamme ? '保存' : '変更する'}</button>
                        {isEditingNamme ? <button className="w-[20%] bg-blue-300 border rounded-[15px] mx-3" onClick={cancelClick}>取消</button> : null}

                    </div>
                    <div className="flex p-2">
                        <h3 className="px-[10px] py-2">email:</h3>
                        <p className="border p-2 rounded-[15px] w-[70%]">{user.email}</p>
                    </div>
                    <div className="flex p-2 ">
                        <h3 className="px-[10px] py-2">パスワードの更新：</h3>
                        <div>
                            {/* 按鈕叫出彈窗 */}
                            <button  onClick={() => setOpen(true)} className="w-[20%] px-[10px] py-2 bg-blue-300 border rounded-[15px] w-[20rem]">
                                <p className="flex justify-center">パスワードの更新</p>
                            </button>
                            {/* 彈窗 */}
                                <Popup open={open} onClose={() => setOpen(false)}>
                                    <h2 className="text-xl font-bold mb-4 text-center">パスワード入力</h2>
                                    <form onSubmit={sendPassword}>
                                        <input className="rounded-[25px] h-[2rem] mb-[10px] w-full" type="password" placeholder="現在のパスワード" onChange={(e) => setData('current_password', e.target.value)} value={data.current_password} />
                                        <input className="rounded-[25px] h-[2rem] mb-[10px] w-full" type="password" placeholder="新しいパスワード" onChange={(e) => setData('password', e.target.value)}  value={data.password} />
                                        <input
                                            className="rounded-[25px] h-[2rem] mb-[10px] w-full"
                                            type="password"
                                            placeholder="パスワード確認"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                        />
                                        <button type="submit" className="h-[2rem] bg-blue-300 border rounded-[15px] w-[70%] mx-[15%]" disabled={processing}>{processing ? '送信中' : '送信する'}</button>
                                    </form>

                                </Popup>
                                            </div>

                    </div>

                </main>

            </MainLayout>
        </>
    );
}
