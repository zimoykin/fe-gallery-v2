import React from 'react';
import Avatar from '../avatar/avatar-component';
import { IProfile } from '../../interfaces/profile.interface';


interface Props {
    profile?: IProfile;
}

const HeaderGalleryComponent: React.FC<Props> = ({ profile }) => {

    return (
        <>
            <Avatar url={profile?.url} size='medium' />
            <div className='ml-2 p-2 h-auto bg-secondary-bg-75 w-full'>
                <h1 className='text-highlight-cl text-shadow-sm'>{profile?.name}</h1>

                <div>
                    <i className='p-1 fa-solid fa-location-dot text-yellow-500 text-shadow-sm' />
                    <span>{profile?.location?.title}</span>
                </div>

                <div className='
                    hover:text-main-cl
                    hover:cursor-pointer
                    hover:scale-101'>
                    <i className='p-1 fa-solid fa-envelope text-yellow-500 text-shadow-sm
                    ' />
                    <span>{profile?.email}</span>
                </div>
                <div>
                    <i className='p-1 fa-solid fa-globe text-yellow-500 text-shadow-sm' />
                    <span>{profile?.website}</span>
                </div>
            </div>
        </>

    );
};

export default HeaderGalleryComponent;