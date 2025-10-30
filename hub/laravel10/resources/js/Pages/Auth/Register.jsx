import { Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import InputDesign from "@/Components/InputDesign";



export default function Register() {
    const InputData = {
        Id: { for: "userId", label: "ユーザー", type: "text", name: "userId", id:"userId" },
        Pw: { for: "password", label: "パスワード", type: "password", name: "password", id:"password" },
        PwConf: { for: "password_conf", label: "パスワード確認", type: "password", name: "password_conf", id:"password_conf" },
        Email: { for: "email", label: "メールアドレス", type: "email", name: "email", id:"email" }
    };

    return (
        <Guest>
            <form method="POST" action={route("verification.send")}>
                < InputDesign props={InputData}/>

                <div className="mt-[20px] flex justify-start items-center">
                    <input type="checkbox" name="ruleChk" id="ruleChk" />
                    <label htmlFor="ruleChk" className="ml-[15px]">利用規約に同意します。</label>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="shadow-[1px_0px_2px_1px_gray] w-[10em] rounded-[20px] mt-[20px]">確認</button>
                </div>

            </form>

        </Guest>
    );
}
