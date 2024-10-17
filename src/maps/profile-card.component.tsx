import React, { useState } from 'react';
import { IProfile } from '../interfaces/profile.interface';
import Avatar from '../components/avatar/avatar-component';
import { Link } from 'react-router-dom';

interface Props {
    profile: IProfile;
    setHoverProfile: (profileId: string | null) => void;
    setSelectedProfile: (profile: IProfile | null) => void;
}

const ProfileCardComponent: React.FC<Props> = ({ profile, setHoverProfile, setSelectedProfile }) => {

    const [showProfile, setShowProfile] = useState(false);

    return (
        <div
            onMouseEnter={() => setHoverProfile(profile.id)}
            onMouseLeave={() => setHoverProfile(null)}
            key={profile.id} className='w-full p-1 flex md:flex-col flex-row'>
            <div
                onClick={() => {
                    setSelectedProfile(profile);
                    setShowProfile(!showProfile);
                }}
                className='bg-secondary-bg w-full flex flex-col shadow-md rounded-md p-1
                hover:scale-102 hover:cursor-pointer hover:bg-slate-400
                '>
                <div className='flex md:flex-row flex-col w-full'>
                    <div className='flex md:flex-row flex-col w-full justify-start items-center rounded-md border p-1 gap-1'>
                        <Avatar url={profile.url} size={'micro'} />
                        <span className='text-xxs md:text-sm'>{profile.name}</span>
                    </div>
                    <div className='md:text-end w-full text-right flex flex-col justify-start items-end'>
                        {showProfile && <Link
                            onClick={(e) => e.stopPropagation()}
                            target='_blank'
                            to={`/gallery/${profile.id}`}>
                            <div className='
                         hover:cursor-pointer
                         hover:text-highlight-cl hover:bg-highlight-bg
                         hover:scale-105'>
                                <i className='
                        text-xs p-1 fas fa-external-link' />
                            </div>

                        </Link>}

                        <div className='flex md:justify-end justify-start items-center gap-1'>
                            <span className='text-xxs'>{profile.location?.title}</span>
                        </div>
                        {/* <span className='text-xxs'>{`trip ${profile.location?.distance} km`}</span> */}
                        {profile.distance && <p className='text-xxs'>
                            distance <b className='font-bold'>{Math.floor(profile.distance)}</b> km
                        </p>}
                    </div>
                </div>
                {!showProfile && <div className='w-full flex justify-center items-center p-1'>
                    <i className='fas fa-chevron-down text-xxs' />
                </div>}
                {
                    showProfile && (
                        <div className='w-full pt-2'>
                            <p> {profile.favoriteCamera?.name}</p>
                            <p> {profile.favoriteLens?.name}</p>
                            <p className='text-xs rounded-md bg-white text-black p-1 font-thin border'>{profile?.categories.join(' * ')}</p>
                            {/* <ul className='w-full flex flex-col justify-end items-end'>
                                {profile?.categories.map((category) => (
                                    <li className='text-xxs'> {category}</li>
                                ))}
                            </ul> */}
                            <div className='pt-2 w-full flex justify-start items-center'>
                                <i className='fas fa-envelope text-xxs px-2' />
                                <p className='text-xxs font-bold hover:text-highlight-cl'>{profile.email}</p>
                            </div>
                            <div className='w-full flex justify-start items-center'>
                                <i className='fas fa-globe text-xxs  px-2' />
                                <p className='text-xxs font-thin hover:text-highlight-cl'>{profile.website}</p>
                            </div>
                            <div className='w-full flex justify-center items-center p-1'>
                                <i className='fas fa-chevron-up text-xxs' />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProfileCardComponent;