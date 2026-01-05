import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";
import { useForm } from "@inertiajs/react";





export default function ResetPassword({token, email}){

    const inputData = {
        Pw: { for: "password", label: "パスワード", type: "password", name: "password", id:"password", required: true },
        PwConf: { for: "password_confirmation", label: "パスワード確認", type: "password", name: "password_confirmation", id:"password_confirmation", required: true }
    }

    const Myform = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const { post, processing } = Myform;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <>
            <Head title="パスワード変更" />
            <Guest>
                <form  onSubmit={handleSubmit}>
                    < InputDesign props={inputData} from={Myform}/>

                    <div className="flex justify-center">
                        <button type="submit" disabled={processing} className="shadow-[1px_0px_2px_1px_gray] w-[10em] rounded-[20px] mt-[20px]">{Myform.processing ? '確認中' : '未確認'}</button>
                    </div>

                </form>

            </Guest>
        </>
    )

}
