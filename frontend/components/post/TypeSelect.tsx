import { POST_TYPES } from "@/utils/constants";
import { PostType } from "@/utils/types";

export default function TypeSelect({
    onSelect,
} : {
    onSelect: (selectedType: PostType) => void,
}) {

    return (
        <div className="flex flex-col items-center min-h-[200px] gap-5 mt-6">
            {POST_TYPES.map((pt) => (
                <TypeChoice 
                    key={pt}
                    type={pt} 
                    onSelect={onSelect} 
                />
            ))}
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
            className="cursor-pointer bg-purple-light text-purple-dark hover:text-purple-light hover:bg-purple-dark p-2 w-full text-center rounded-lg"
        >
            {type.toUpperCase()}
        </div>
    )
}