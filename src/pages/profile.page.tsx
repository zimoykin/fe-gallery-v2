import React, { useEffect, useState } from 'react';
import Avatar from '../components/avatar/avatar-component';
import { IProfile } from '../interfaces/profile.interface';
import ProfileInfoComponent from '../components/profile/profile-info.component';
import CameraSpinner from '../components/camera-spinner/camera-spinner.component';
import EquipmentsComponent from '../components/profile/equipments.component';
import { IUserFolder } from '../interfaces/folder.interface';
import FoldersComponent from '../components/profile/folders.component';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [profile, setProfile] = useState<IProfile | null>(null);
    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoadingProfle, setIsLoadingProfile] = useState<boolean>(false);
    const [isLoadingFolders, setIsLoadingFolders] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        setIsLoadingProfile(true);
        setTimeout(() => {
            setIsLoadingProfile(false);
            setProfile({
                id: '1',
                name: 'John Doe',
                email: 'john.doe@me.com',
                location: 'Regensburg, Germany',
                website: 'https://github.com/zimoykin',
                url: '/avatar.jpg',
                privateAccess: 0,
                userId: '1',
                equipment: [
                    { favorite: true, name: 'Canon EOS 5D Mark IV', type: 'camera' },
                    { favorite: true, name: 'Canon Ef 50mm f/1.4', type: 'lens' },
                    { favorite: false, name: 'Canon Ef 35-80 f/3.5', type: 'lens' },
                    { favorite: false, name: 'Canon Ef-s 28-45 f/4', type: 'lens' },
                ]
            });
        }, 2000);
    }, []);

    useEffect(() => {
        setIsLoadingFolders(true);
        document.title = `Profile ${profile?.name ?? 'unknown'} | Gallery | React`;
        setTimeout(() => {
            setIsLoadingFolders(false);
            setFolders([
                {
                    bgColor: '#f5f5f5',
                    color: '#000',
                    description: 'My photos from Berlin session',
                    id: '1',
                    profileId: '1',
                    sortOrder: 1,
                    title: 'Berlin | 2024',
                    url: '/my-photos.jpg',
                    privateAccess: 0
                }, {
                    bgColor: '#f5f5f5',
                    color: '#000',
                    description: 'From Olympics games in Paris, From Olympics games in Paris, From Olympics games in Paris, From Olympics games in Paris',
                    id: '2',
                    profileId: '1',
                    sortOrder: 2,
                    title: 'Paris Olympics | 2024',
                    url: '/my-photos.jpg',
                    privateAccess: 0
                }
            ]);
        }, 3000);
    }, [profile?.name]);


    return (<div
        className='flex w-full shadow-lg h-full md:flex-row flex-col justify-start items-center md:p-1 md:gap-2 overflow-auto'
    >
        {/* left side */}
        <div className='relative h-full md:w-1/3 w-full 
        flex-col justify-center items-center 
        bg-main-bg p-2 shadow-2xl md:rounded-xl'>
            <div className='w-full flex justify-center'>
                <Avatar size='medium' url={profile?.url} />
            </div>

            {profile && <ProfileInfoComponent profile={profile} />}
            {isLoadingProfle && <div className='hidden md:flex h-full w-full bg-black bg-opacity-60
            justify-center items-center absolute top-0 left-0' >
                <CameraSpinner size='medium' />
            </div>}
        </div>


        {/* right side */}
        <div className='md:w-2/3 w-full h-full shadow-2xl md:rounded-xl relative'>
            {/* top right */}
            <div className='w-full h-full md:rounded-t-xl md:h-1/2   bg-secondary-bg-75  flex justify-start relative items-start overflow-y-auto'>
                <FoldersComponent folders={folders} />
                {isLoadingFolders && <div className='hidden w-full md:flex bg-black bg-opacity-60 justify-center items-center md:h-full absolute top-0 left-0' >
                    <CameraSpinner size='large' />
                </div>}
            </div >
            {/* bottom right */}
            <div className='w-full h-full md:h-1/2  bg-secondary-bg-75  flex justify-start relative items-start overflow-y-auto'>
                <EquipmentsComponent equipments={profile?.equipment ?? []} />
                {isLoadingProfle && <div className='hidden w-full md:flex bg-black bg-opacity-60 justify-center items-center md:h-full absolute top-0 left-0' >
                    <CameraSpinner size='large' />
                </div>}
            </div>
        </div>

    </div>);
};

export default ProfilePage;