import { Link } from "react-router-dom";
import React from "react";
import unckeck from '@/assets/x_circle_red.png';



export default function InputDesign({props}) {

    // State 用於儲存輸入資料
    const [Data, setData] = React.useState({
        userId: '',
        password: '',
        password_conf: '',
        email: ''
    });

    const handleChange = (e) => {
        setData({
            // ...Data 把 setData 這個物件裡現有的全部內容展開出來」。
            ...Data,
            [e.target.name]: e.target.value
        });

    }

    return (
        <>
            {Object.entries(props).map(([key, items]) => (
                <div className="my-[1em] flex flex-col" key={key}>
                    <label htmlFor={items.for} className="pr-[10px] ml-[10px]">{items.label}{items.required && <span className="text-red-500 ml-1">*</span>}</label>
                    <div className="flex">
                        <input type={items.type} name={items.name} id={items.id} onChange={handleChange} className="rounded-[15px] h-[25px] w-[80%] mt-[5px]"></input>
                        {/* 這裡用 Data 檢查輸入是否為空 */}
                        {Data[items.name] === '' &&
                            (<p className="text-red-500 mx-[5px] mt-[5px] "><img src={unckeck}/></p> )
                        }
                        {Data.password !== Data.password_conf && Data.password_conf !== "" && items.name === "password_conf" && ( <p className="text-red-500 mx-[5px] mt-[5px]">パスワード不一致</p> )}
                    </div>

                </div>
            ))}
        </>

    );
}
