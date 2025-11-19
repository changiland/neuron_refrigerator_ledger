import { Link, Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";
import { useForm } from "@inertiajs/react";



export default function Register() {
    const InputData = {
        Id: { for: "name", label: "ユーザー", type: "text", name: "name", id:"name", required: true},
        Pw: { for: "password", label: "パスワード", type: "password", name: "password", id:"password", required: true },
        PwConf: { for: "password_confirmation", label: "パスワード確認", type: "password", name: "password_confirmation", id:"password_confirmation", required: true },
        Email: { for: "email", label: "メールアドレス", type: "email", name: "email", id:"email", required: true }
    };

    const Myform = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }); // useForm 用於管理表單資料和狀態

    const { post, processing } = Myform;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register')); // 送到 Laravel 的 POST /register
    };

    return (
        <>
            <Head title="登録" />
            <Guest>
                <form  onSubmit={handleSubmit}>
                    < InputDesign props={InputData} from={Myform}/>

                    <div className="mt-[20px] flex justify-start items-center">
                        <input type="checkbox" name="ruleChk" id="ruleChk" required  />
                        <label htmlFor="ruleChk" className="ml-[15px]" >利用規約に同意します。</label>
                    </div>

                    <div className="flex justify-center">
                        <button disabled={processing} className="shadow-[1px_0px_2px_1px_gray] w-[10em] rounded-[20px] mt-[20px]">{Myform.processing ? '確認中' : '未確認'}</button>
                    </div>

                </form>

            </Guest>
        </>
    );
}
