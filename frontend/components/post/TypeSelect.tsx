import { POST_TYPES } from "@/utils/constants";
import { PostType } from "@/utils/types";

export default function TypeSelect({
    onSelect,
} : {
    onSelect: (selectedType: PostType) => void,
}) {

    return (
        <div className="flex justify-between items-center gap-12">
            <div className="flex flex-col min-h-[200px] gap-5">
                <div className="text-purple-dark font-semibold text-lg">
                    Project Owner
                </div>
                {POST_TYPES.map((pt) => (
                    <TypeChoice 
                        key={pt}
                        type={pt} 
                        onSelect={onSelect} 
                    />
                ))}
            </div>
            <div className="bg-purple-dark h-12 w-[1px]" />
            <div className="flex flex-col min-h-[200px] gap-5">
                <div className="text-purple-dark font-semibold text-lg">
                    Web3er
                </div>
                <TypeChoice 
                    type="post" 
                    onSelect={onSelect} 
                />
            </div>
        </div>
    )
}

function TypeChoice({
    type,
    onSelect,
} : {
    type: PostType,
    onSelect: (selectedType: PostType) => void,
}) {
    return (
        <div 
            onClick={() => { onSelect(type) }}
            className="cursor-pointer hover:text-purple-dark"
        >
            {type}
        </div>
    )
}