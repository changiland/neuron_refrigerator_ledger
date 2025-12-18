




export default function StockView({ inventory }) {

    //console.log(inventory);
    return (
        <>
            <thead >
                <tr className=" h-[100px]">
                    <th >項目</th>
                    <th >食分</th>
                </tr>
            </thead>
            <tbody >
                {

                    (!inventory || inventory.length === 0) ? (
                        <tr>
                            <td colSpan="2" className="text-center">データがありません</td>
                        </tr>
                    ) : (
                        inventory.map(item => (
                            console.log(inventory.length),
                            <tr key={item.id} className="h-[50px]">
                                <td><p className="flex justify-center">{item.product?.name || ""}</p></td>
                                <td><p className="flex justify-center">{item.quantity || ""}</p></td>
                            </tr>
                        ))
                    )
                }

            </tbody>
        </>
    );
}
