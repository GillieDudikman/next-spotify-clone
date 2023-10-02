"use client"

import {Song} from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

interface MediaItemProps {
    song: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
    const imageUrl = useLoadImage(song);

    const handleClick = () => {
        if (onClick)
            return onClick(song.id)
    }

    return (
        <div onClick={onClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50
        w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image src={imageUrl || '/images/spotify-like.png'} alt="Image" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{song.title}</p>
                <p className="text-neutral-400 text-sm truncate">{song.author}</p>
            </div>
        </div>
    )
}
export default MediaItem