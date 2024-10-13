import React, { useMemo, useRef, useState } from 'react';
import Avatar from '../components/avatar/avatar-component';
import { IProfile } from '../interfaces/profile.interface';
import ProfileInfoComponent from '../components/profile/profile-info.component';
import CameraSpinner from '../components/camera-spinner/camera-spinner.component';
import EquipmentsComponent from '../components/profile/equipments.component';
import FoldersComponent from '../components/profile/folders.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ApiClient } from '../networking';
import { storeProfile } from '../features/profile/profile-slice';
import LocationComponent from '../components/profile/location.component';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

const ProfilePage: React.FC = () => {

    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const { profile: storedProfile } = useSelector((state: RootState) => state.profile);
    const [profile, setProfile] = useState<IProfile | null>(() => {
        if (storedProfile) {
            return storedProfile;
        }
        return null;
    });
    const [isLoadingProfle, setIsLoadingProfile] = useState<boolean>(false);


    const geocodingLib = useMapsLibrary('geocoding');
    const geocoder = useMemo(
        () => geocodingLib && new geocodingLib.Geocoder(),
        [geocodingLib]
    );

    const resolveAddressByCoordinates = (lat: number, lng: number) => {
        if (!geocoder) return;
        geocoder.geocode({ location: { lat, lng }, language: 'en' }).then((response) => {
            if (!response.results) return;

            if (response.results.length > 0) {
                const { address_components } = response.results[0];
                const newAddress: string[] = [];
                address_components.forEach(({ long_name, types }) => {
                    switch (types[0]) {
                        case 'country':
                            newAddress.push(long_name);
                            break;
                        case 'locality':
                            newAddress.unshift(long_name);
                            break;
                    }
                });
                setProfile((prof) => {
                    if (prof) {
                        return {
                            ...prof,
                            location: {
                                ...prof.location,
                                title: newAddress.join(', '),
                                lat,
                                long: lng,
                                distance: prof.location?.distance ?? 25
                            }
                        };
                    }
                    return null;
                });
            }

        });
    };

    const resolveAddressByTitle = (address: string) => {
        if (!geocoder) return;
        geocoder.geocode({ address }).then((response) => {
            if (!response.results) return;
            const { lat, lng } = response.results[0].geometry.location;
            resolveAddressByCoordinates(lat(), lng());
        });
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            setIsLoadingProfile(true);
            ApiClient.postUpload('/profiles/photo/upload', formData)
                .then(() => {
                    setIsLoadingProfile(true);
                    ApiClient.get<IProfile>('/profiles/me')
                        .then((profile) => {
                            dispatch(storeProfile(profile));
                            setProfile(profile);
                        })
                        .finally(() => setIsLoadingProfile(false));
                })
                .finally(() => setIsLoadingProfile(false));
        }
    };

    return (<div
        className='flex w-full shadow-lg h-full md:flex-row flex-col justify-start items-center md:p-1 md:gap-2 overflow-auto'
    >
        <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            style={{ display: 'none' }}
            id="avatar-input"
            accept="image/*"
        />
        {/* left side */}
        <div className='relative h-full md:w-1/3 w-full 
        flex-col justify-center items-center 
        bg-main-bg p-2 shadow-2xl md:rounded-xl'>
            <div
                onClick={handleAvatarClick}
                className='w-full flex justify-center'>
                <Avatar size='medium' url={profile?.url} />
            </div>

            {profile && <ProfileInfoComponent
                onEditClick={() => setEditMode(!editMode)}
                onCancel={() => setEditMode(false)}
                onSave={() => setEditMode(false)}
                location={profile?.location}
                resolveAddressByTitle={resolveAddressByTitle}
                editMode={editMode}
                profile={profile} />}
            {isLoadingProfle && <div className='hidden md:flex h-full w-full bg-black bg-opacity-60
            justify-center items-center absolute top-0 left-0' >
                <CameraSpinner size='medium' />
            </div>}
        </div>

        {/* right side */}
        <div className='md:w-2/3 w-full h-full shadow-2xl md:rounded-xl relative'>
            {!editMode
                ? <>
                    {/* top right */}
                    < div className='w-full h-full md:rounded-t-xl md:h-1/2   bg-secondary-bg-75  flex justify-start relative items-start overflow-y-auto'>
                        <FoldersComponent />
                    </div >
                    {/* bottom right */}
                    <div className='w-full h-full md:h-1/2  bg-secondary-bg-75  flex justify-start relative items-start overflow-y-auto'>
                        <EquipmentsComponent />
                    </div>
                </>
                :
                <>
                    <div className='w-full h-full md:rounded-t-xl bg-secondary-bg-75  flex justify-start relative items-start overflow-y-auto'>
                        <LocationComponent
                            resolveAddressByCoordinates={resolveAddressByCoordinates}
                            profile={profile}
                        />
                    </div>
                </>
            }
        </div>
    </div >);
};

export default ProfilePage;