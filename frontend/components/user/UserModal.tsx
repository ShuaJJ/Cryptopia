import Modal from "../Modal";
import MainButton from "../button/MainButton";

export default function UserModal({
    logo,
    name,
    description,
    close,
} : {
    logo: string,
    name: string,
    description: string,
    close: () => void,
}) {
    return (
        <Modal>
            <div
                className="absolute right-1 top-0 cursor-pointer text-lg p-4"
                onClick={(e) => { 
                    e.stopPropagation();
                    close()
                 }}
            >
                X
            </div>
            <div className="flex flex-col gap-4 items-center justify-center min-w-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */} 
                <img 
                    src={logo}
                    alt="logo"
                    className="w-24 h-24 rounded-full"
                />
                <div className="font-semibold text-lg">{name}</div>
                <div className="text-gray-400 mb-8 text-sm">{description}</div>
                <MainButton
                    secondary
                    onClick={() => {

                    }}
                >
                    Follow
                </MainButton>
                <MainButton
                    onClick={() => {
                        
                    }}
                >
                    Send Message
                </MainButton>
            </div>
        </Modal>
    )
}