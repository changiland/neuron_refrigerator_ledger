import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";




export default function Login() {
const label = {
    Id: { for: "userId", label: "ユーザー", type: "text", name: "userId", id:"userId", required: true},
    Pw: { for: "password", label: "パスワード", type: "password", name: "password", id:"password", required: true }
}

    return (
        <>
            <Head title="ログイン" />
            <MainLayout>
                <Guest>
                <form method="POST" action={route("login")}>
                    <InputDesign props={label}/>
                <div className="flex justify-center">
                    <button type="submit" className="shadow-[1px_0px_2px_1px_gray] w-[10em] rounded-[20px] mt-[20px]">ログイン</button>
                </div>

                </form>
                </Guest>
            </MainLayout>
        </>

    );
}
