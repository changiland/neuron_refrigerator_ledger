import React from "react";
import unckeck from '@/assets/x_circle_red.png';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



export default function InputDesign({props, from}) {

    // State 用於儲存輸入資料
    /*const [Data, setData] = React.useState({
        name: '',
        password: '',
        password_conf: '',
        email: ''
    });*/

    /*const handleChange = (e) => {
        setData({
            // ...Data 把 setData 這個物件裡現有的全部內容展開出來」。
            ...Data,
            [e.target.name]: e.target.value
        });

    }*/
    const { data, setData,} = from;



    /*const schema = z.object({
        email: z.string().email("Email 格式無效"),
        password: z.string().min(6, "至少 6 個字"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    <input {...register("email")} placeholder="Email"/>
      <p>{errors.email?.message}</p>*/


    return (
        <>
            {Object.entries(props).map(([key, items]) => (
                <div className="my-[1em] flex flex-col" key={key}>
                    <label htmlFor={items.for} className="pr-[10px] ml-[10px]">
                        {items.label}
                        {items.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="flex">
                        <input
                            type={items.type}
                            name={items.name}
                            id={items.id}
                            value={data[items.name] || ''}
                            onChange={e => setData( items.name , e.target.value)} className="rounded-[15px] h-[25px] w-[80%] mt-[5px]">
                        </input>
                        {/* 空欄エラー */}
                        {data[items.name] === '' && (
                            <p className="text-red-500 mx-[5px] mt-[5px]">
                                <img src={unckeck} />
                            </p>
                        )}

                        {/* 密碼不一致 */}
                        {items.name === "password_confirmation" &&
                         data.password !== data.password_confirmation &&
                         data.password_confirmation !== "" && (
                            <p className="text-red-500 mx-[5px] mt-[5px]">パスワード不一致</p>
                        )}
                    </div>

                </div>
            ))}
        </>

    );
}
