import { useRef } from "react"


export default function UserInfo() {

    const fileRef = useRef<HTMLInputElement>(null);
    const fileSelect = () => {
        console.log('AAA')
    }

    return (
        <div className="p-12 flex flex-col items-center bg-white rounded-2xl min-w-[320px]">
            <button 
                className="bg-gray-300 w-24 h-24 flex-inline items-center justify-center text-2xl rounded-full mb-6"
                onClick={() => { fileRef.current!.click() }}
            >
                +<br/>Logo
            </button>
            <input hidden type="file" onChange={fileSelect} ref={fileRef} />

            <input className="text-center" placeholder="Your project's name" type="text" />
        </div>
    )
}