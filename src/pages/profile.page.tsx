import React, { useEffect, useState } from 'react';
import Avatar from '../components/avatar/avatar-component';
import { IProfile } from '../interfaces/profile.interface';
import ProfileInfoComponent from '../components/profile/profile-info.component';
const ProfilePage: React.FC = () => {

    const [profile, setProfile] = useState<IProfile | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setProfile({
                id: '1',
                name: 'John Doe',
                email: 'john.doe@me.com',
                location: 'Regensburg, Germany',
                website: 'https://github.com/zimoykin',
                url: '/public/avatar.jpg',
                privateAccess: 0,
                userId: '1',
                equipment: [
                    { favorite: true, name: 'Canon EOS 5D Mark IV', type: 'camera' },
                    { favorite: true, name: 'Canon Ef 50mm f/1.4', type: 'lens' },
                    { favorite: false, name: 'Canon Ef 35-80 f/3.5', type: 'lens' },
                ]
            });
        }, 2000);
    });

    return (<div
        className='flex w-full shadow-lg h-full md:flex-row flex-col justify-start items-center md:p-1 md:gap-2'
    >
        {/* left side */}
        <div className='h-full md:w-1/3 w-full bg-main-bg p-1 shadow-2xl md:rounded-xl'>
            <Avatar url={profile?.url} />
            {profile && <ProfileInfoComponent profile={profile} />}
        </div>

        {/* right side */}
        <div className='h-full md:w-2/3 w-full bg-secondary-bg shadow-2xl md:rounded-xl'>

        </div>

    </div>);
};

export default ProfilePage;