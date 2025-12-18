




export default function Popup({ open, onClose, children, title, message }) {

    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded-[0px_5px_0px_5px] hover:bg-red-600 absolute right-0 top-0 "
                >
                    閉じる
                </button>
                {children}
            </div>
        </div>
    );
}
