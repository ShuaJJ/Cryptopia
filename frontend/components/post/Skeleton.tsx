export default function Skeleton() {
    return (
        <div className="border border-purple-light shadow rounded-md p-4 w-full h-24">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-purple-dark h-10 w-10"></div>
                <div className="flex-1 space-y-3 py-1">
                <div className="h-2 bg-purple-dark rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-purple-dark rounded col-span-2"></div>
                    <div className="h-2 bg-purple-dark rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-purple-dark rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
}