import { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "@inertiajs/react";
import { set } from "zod";




export default function Transaction( { stocks } ) {
    console.log(stocks);
    const today = dayjs().format("YYYY/MM/DD");
    const [selectcategory, setSelectCategory] = useState(""); // カテゴリの状態管理
    const [selectproducts, setSelectProducts] = useState(""); // 製品の状態管理

    const categories = [...new Map(
        stocks
        .filter(s => s.product && s.product.category)
        .map(c => [c.product.category.id,
            {name: c.product.category.name, id: c.product.category.id}
        ])
    ).values()];

    const products = stocks.filter( p =>
        p.product &&
        p.product.category &&
        String(p.product.category_id) === selectcategory);

    console.log(selectproducts);

    const {data, setData, post, processing} = useForm({
        day: '',
        category_id: '',
        category_name: '',
        fname_id: '',
        fname: '',
        meal: ''
    }); // フォームデータの管理

    const submit = (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防止

        post(route('products.updata')); // データを送信

        // フォームのリセット
        setData("day", "");
        setData("category_id", "");
        setData("category_name", "");
        setData("fname_id", "");
        setData("fname", "");
        setData("meal", "");
        setSelectCategory("");
        setSelectProducts("");
    };

    return (
        <>

            <form className="flex flex-col gap-3" onSubmit={submit} >
                <input
                    className="border p-2 rounded"
                    placeholder="日付:yyyy/mm/dd"
                    defaultValue={today}
                onChange={e => setData("day", e.target.value)}/>
                {/* 種類、名前の選択肢を表示 */}
                <select className="border p-2 rounded" onChange={e =>
                    {
                    setData("category_id",e.target.value);
                    setData("category_name", e.target.options[e.target.selectedIndex].text);
                    setSelectCategory(e.target.value);
                    setSelectProducts("");
                     }} value={selectcategory}>
                    <option value="">種類選択</option>
                    {categories.map(category => (
                        <option value={String(category.id)} key={category.id}>{category.name}</option>
                    )) }
                </select>
                <select className="border p-2 rounded" onChange={e =>
                    {
                    setData("fname_id", e.target.value);
                    setData("fname", e.target.options[e.target.selectedIndex].text);
                    setSelectProducts(e.target.value);
                    }} value={selectproducts}>
                        <option value="">名前選択</option>
                        {products.map(fname => (
                            <option value={String(fname.id)} key={fname.id}>{fname.product.name}</option>
                        ))}
                </select>
                <input
                    className="border p-2 rounded"
                    placeholder="食分"
                    onChange={e => setData("meal", e.target.value)}
                />

                <button type="submit" disabled={processing}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded">保存</button>
            </form>
        </>
    );
}
