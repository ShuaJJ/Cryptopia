export default function ImageViewer({ url }: { url: string }) {
    return (
        <a 
            className="block w-full aspect-video bg-cover bg-center"
            style={{ backgroundImage: "url("+url+")"}}
            href={url}
            target="_blank"
        >

        </a>
    )
}