import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";
import { useForm } from "@inertiajs/react";




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
        e.preventDefault();

        post(route('login'));
    };

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
                </Guest>
            </MainLayout>
        </>

    );
}
