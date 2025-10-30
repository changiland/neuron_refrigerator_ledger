import { Link } from "react-router-dom";



export default function InputDesign({props}) {
    return (
        <>
            {Object.entries(props).map(([key, items]) => (
                <div className="mt-4" key={key}>
                    <label htmlFor={items.for} className="pr-[10px]">{items.label}</label>
                    <input type={items.type} name={items.name} id={items.id} className="flex rounded-[15px] h-[25px] w-[70%]"></input>
                </div>
            ))}
        </>

    );
}
