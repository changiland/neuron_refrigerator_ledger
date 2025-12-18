import {Link} from "@inertiajs/react"




export default function AdminPage() {
    return (
        <>
            <div>
                <Link href={route('QandAForm')}><p className="cursor-pointer">QandAForm</p></Link>
            </div>
            <div>
                <Link href={route('NewsForm')}><p className="cursor-pointer">NewsForm</p></Link>
            </div>
            <div>
                <Link href={route('AdminProduct')}><p className="cursor-pointer">AdminProduct</p></Link>
            </div>
        </>
    )
}
