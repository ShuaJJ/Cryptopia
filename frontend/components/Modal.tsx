export default function Modal({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-sm bg-white/40 flex items-center justify-center">
            <div className="bg-white py-12 px-16 rounded-3xl relative">
                { children }
            </div>
        </div>
    )
}