"use client"

import {Song} from "@/types";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if(!isLoading && !user)
            router.replace('/')
    }, [isLoading, user, router]);

    if(songs.length === 0){
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No Liked Songs
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-y-2 w-full p-6">
            { songs.map(song => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem song={song} onClick={(id: string)=> onPlay(id)}/>
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    )

}
export default LikedContent