import React from 'react';
import { IProfile } from '../../interfaces/profile.interface';

interface Props {
    profile: IProfile;
}
const ProfileInfoComponent: React.FC<Props> = ({ profile }) => {
    return (
        <div className='flex flex-col w-full justify-center items-center p-1'>
            <div className='flex flex-row justify-center items-center gap-2'>
                <h1 className='text-main-col text-5xl font-bold'>{profile.name}</h1>
                <i className='p-2 fas fa-pen 
                hover:text-main-col hover:cursor-pointer hover:scale-105
                border border-main-col rounded-xl' />
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <i className='p-1 fa-solid fa-location-dot' />
                <p>{profile.location}</p>
            </div>
            <p>{profile.bio}</p>
            {profile?.website &&
                <div className='flex flex-row justify-center items-center gap-2'>
                    <i className='p-1 fa-solid fa-globe' />
                    <a
                        href={profile.website}
                        className='cursor-pointer font-thin hover:text-main-col'>{profile.website}</a>
                </div>

            }
            <div className='flex flex-row justify-center items-center gap-2'>
                <i className='p-1 fa-solid fa-envelope' />
                <p>{profile.email}</p>
            </div>
            <p>{profile.privateAccess === 1 ? 'private' : 'public'}</p>
        </ div>
    );
};

export default ProfileInfoComponent;