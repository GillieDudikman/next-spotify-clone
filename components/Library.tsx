"use client"
import {BiSolidPlaylist} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();
    const subscribedModal = useSubscribeModal();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user) {
            return authModal.onOpen();
        }
        if(!subscription)
            return subscribedModal.onOpen();

        return uploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <BiSolidPlaylist size={26} className="text-neutral-400"/>
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <AiOutlinePlus size={20} className="text-neutral-400 cursor-pointer hover:text-white
                transition" onClick={onClick}/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map(song => (
                    <MediaItem key={song.id} onClick={(id:string) => onPlay(id)} song={song}/>
                ))}
            </div>
        </div>
    )
}
export default Library