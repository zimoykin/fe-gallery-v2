import React from 'react';
import { IProfile } from '../interfaces/profile.interface';
import Avatar from '../components/avatar/avatar-component';

interface Props {
    filteredProfiles: IProfile[];

    setHoverProfile: (profileId: string | null) => void;
    setSelectedProfile: (profile: IProfile | null) => void;
    updateProfile: () => void;
}

const ProfilesMapSearchComponent: React.FC<Props> = ({ filteredProfiles, setHoverProfile, setSelectedProfile }) => {

    return (
        <div className="w-full overflow-scroll no-scrollbar">
            {filteredProfiles.map((profile, i) => (
                <div
                    onMouseEnter={() => setHoverProfile(profile.id)}
                    onMouseLeave={() => setHoverProfile(null)}
                    key={profile.id ?? i} className='w-full p-1 flex md:flex-col flex-row '>
                    <div
                        onClick={() => {
                            setSelectedProfile(profile);
                        }}
                        className='bg-secondary-bg w-full flex flex-col shadow-md rounded-md p-1
                            hover:scale-105 hover:cursor-pointer hover:bg-slate-400
                            '>
                        <div className='flex md:flex-row flex-col w-full'>
                            <div className='flex md:flex-row flex-col w-full justify-center items-center'>
                                <Avatar url={profile.url} size={'mini'} />
                            </div>
                            <div className='md:text-end w-full text-center flex flex-col justify-center items-center'>
                                <span className='text-xxs md:text-sm text-center'>{profile.name}</span>
                                <div className='flex w-full md:justify-end justify-center items-center gap-1'>
                                    <span className='text-xxs'> 📍 </span>
                                    <span className='text-xxs'>{profile.location?.title}</span>
                                </div>
                                <span className='text-xxs'>{`possible trip ${profile.location?.distance} km`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ProfilesMapSearchComponent;