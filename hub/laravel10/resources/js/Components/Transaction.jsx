import { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "@inertiajs/react";
import { set } from "zod";




export default function Transaction( { categories } ) {
    console.log(categories);
    const today = dayjs().format("YYYY/MM/DD");
    const [hasExpiration, setHasExpiration] = useState("0"); // タイプの状態管理
    const [selectparents , setSelectParents] = useState(""); // 親カテゴリの状態管理
    const [selectcategory, setSelectCategory] = useState(""); // カテゴリの状態管理
    const [selectproducts, setSelectProducts] = useState(""); // 製品の状態管理

    const parents = categories.filter(c => c.parent_id === null);
    /*[...new Map(
        categories.filter(p => p.category?.parent)
        .map(p => [p.category.parent.id,
            {name: p.category.parent.name, id: p.category.parent.id}
        ])
    ).values()];*/

    const categorys = categories.filter( c => String(c.parent_id) === selectparents);
    /*[...new Map(
            categories.filter(c => String(c.category?.parent_id) === selectparents)
            .map(c => [c.category.id, // 親カテゴリに基づいてフィルタリング
                {name: c.category.name, id: c.category.id}
            ])
        ).values()];*/

    const productList = categories.find( c => String(c.id) === selectcategory && String(c.parent_id) === selectparents)?.products || [];
    /*[...new Map(
        categories.filter(p => String(p.category?.parent?.id) === selectparents && String(p.category?.id) === selectcategory)
        .map(p => [p.id, {name: p.name, id: p.id}

        ])
    ).values()];*/
    console.log(productList);

    const {data, setData, post, processing} = useForm({
        day: '',
        type_id: '',
        type_name: '',
        category_id: '',
        category_name: '',
        fname_id: '',
        fname: '',
        meal: '',
        cost: '',
        expiration_date: ''
    }); // フォームデータの管理

    //const handleChange = (e) => {
            //const { name, value } = e.target;

            // ローカル state 更新
            //setType({...type, [name]: value});

            // Inertia form state 更新
            //setData(name, value);
    //};

    const submit = (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防止

        post(route('products.store')); // データを送信

        // フォームのリセット
        setData("day", "");
        setData("type_id", "");
        setData("type_name", "");
        setData("category_id", "");
        setData("category_name", "");
        setData("fname_id", "");
        setData("fname", "");
        setData("meal", "");
        setData("cost", "");
        setData("expiration_date", "");
        setSelectParents("");
        setSelectCategory("");
        setSelectProducts("");
        setHasExpiration("0");
    };

    return (
        <>

            <form className="flex flex-col gap-3" onSubmit={submit} >
                <input
                    className="border p-2 rounded"
                    placeholder="日付:yyyy/mm/dd"
                    defaultValue={today}
                onChange={e => setData("day", e.target.value)}/>
                {/* 分類、種類、名前の選択肢を表示 */}

                <select className="border p-2 rounded" onChange={e =>
                    {
                    setData("type_id", e.target.value);
                    if (selectparents !== "0") {
                        setData("type_name", e.target.options[e.target.selectedIndex].text);
                    }
                    setSelectParents(e.target.value);
                    setSelectCategory("");
                    setSelectProducts(""); }} value={selectparents}>
                    <option value="">分類選択</option>
                    {parents.map( parent => (
                        <option value={String(parent.id)} key={parent.id}>{parent.name}</option>
                    ))}
                    <option value="0">新規</option>
                </select>
                    {selectparents === "0" && <input
                        className="border p-2 rounded"
                        placeholder="分類"
                        onChange={e => setData("type_name", e.target.value)}
                    />}

                <select className="border p-2 rounded" onChange={e =>
                    {
                    setData("category_id",e.target.value);
                    if (selectcategory !== "0") {
                        setData("category_name", e.target.options[e.target.selectedIndex].text);
                    }
                    setSelectCategory(e.target.value);
                    setSelectProducts(""); }} value={selectcategory}>
                    <option value="">種類選択</option>
                    {categorys.map(category => (
                        <option value={String(category.id)} key={category.id}>{category.name}</option>
                    )) }
                    <option value="0">新規</option>
                </select>
                    {selectcategory === "0" && <input
                        className="border p-2 rounded"
                        placeholder="種類"
                        onChange={e => setData("category_name", e.target.value)}
                    />}

                <select className="border p-2 rounded" onChange={e =>
                    {
                    setData("fname_id", e.target.value);
                    if (selectproducts !== "0") {
                        setData("fname", e.target.options[e.target.selectedIndex].text);
                    }
                    setSelectProducts(e.target.value); }} value={selectproducts}>
                        <option value="">名前選択</option>
                        {productList.map(fname => (
                            <option value={String(fname.id)} key={fname.id}>{fname.name}</option>
                        ))}
                        <option value="0">新規</option>
                </select>
                    {selectproducts === "0" && <input
                            className="border p-2 rounded"
                            placeholder="名前"
                            onChange={e => setData("fname", e.target.value)}
                        />}

                <input
                    className="border p-2 rounded"
                    placeholder="食分"
                    onChange={e => setData("meal", e.target.value)}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="金額"
                    onChange={e => setData("cost", e.target.value)}
                />

                <select
                    className="border p-2 rounded"
                    value={hasExpiration} // 預設為 "0"
                    onChange={e => {
                        setHasExpiration(e.target.value);
                        if (e.target.value === "0") {
                            setData("expiration_date", "");
                        }
                    }}
                    >
                    <option value="0">消費期限なし</option>
                    <option value="1">消費期限あり</option>
                </select>

                    {hasExpiration === "1" && (
                    <input
                        className="border p-2 rounded"
                        placeholder="日付:yyyy/mm/dd"
                        value={data.expiration_date || ""}
                        onChange={e => setData("expiration_date", e.target.value)}
                    />
                    )}

                <button type="submit" disabled={processing}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded">保存</button>
            </form>
        </>
    );
}
