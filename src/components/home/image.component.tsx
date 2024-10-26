import React, { useEffect, useRef } from "react";
import { IPhoto } from "../../interfaces/photo.interface";
import { IProfile } from "../../interfaces/profile.interface";
import { Link } from "react-router-dom";
import Avatar from "../avatar/avatar-component";

interface Props {
    photo: IPhoto;
    profile: IProfile;
}

const ImageHomeComponent: React.FC<Props> = ({ photo, profile }) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const adjustHeight = (imageUrl: string) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const current = ref.current;
            if (current) {
                current.style.height = `${current.offsetWidth / aspectRatio}px`;
            }
        };
        img.onerror = console.error;
    };

    useEffect(() => {
        if (photo && ref.current) {
            adjustHeight(photo.compressedUrl ?? '');
        }
    }, [photo]);

    return (
        <>
            <div
                className="relative bg-white mb-4 bg-cover bg-center break-inside-avoid h-auto"
            >
                <Link
                    to={`/gallery/${profile?.id}?folder=${photo.folderId}&id=${photo._id}`}
                >
                    <div
                        ref={(el) => (ref.current = el)}
                        className="relative bg-white bg-cover bg-center break-inside-avoid h-auto max-h-[700px]
                    hover:cursor-pointer hover:scale-103 transition-all duration-200 delay-75 ease-in-out
                    "
                        style={{ backgroundImage: `url(${photo.compressedUrl})` }}
                    />

                    <div className='absolute top-0 left-0
flex flex-row justify-start items-center w-full'>
                        <div className='absolute bg-gray-400 l bg-opacity-45 w-full h-6' />
                        <div className='relative w-full h-full bg-opacity-90 flex justify-end items-center'>
                            <div className=''>
                                <span className='text-black text-shadow-sm'>{profile?.name}</span>
                            </div>

                            <div className='bg-gray-400 bg-opacity-45 rounded-full p-[4px]'>
                                <div className='hidden md:flex justify-center items-center bg-red-500 p-[2px] rounded-full'>
                                    <Avatar url={profile?.url ?? ''} size='mini' />
                                </div>
                                <div className='md:hidden flex justify-center items-center bg-red-500 p-[2px] rounded-full'>
                                    <Avatar url={profile?.url ?? ''} size='micro' />
                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            </div>

        </>);
};

export default ImageHomeComponent;;