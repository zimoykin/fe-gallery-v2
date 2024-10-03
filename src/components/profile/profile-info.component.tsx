import React, { useEffect, useState } from 'react';
import { IProfile } from '../../interfaces/profile.interface';
import { ApiClient } from '../../networking';
import { useDispatch } from 'react-redux';
import { storeProfile } from '../../features/profile/profile-slice';
import CameraSpinner from '../camera-spinner/camera-spinner.component';

interface Props {
    profile: IProfile;
}
const ProfileInfoComponent: React.FC<Props> = ({ profile }) => {

    const dispatch = useDispatch();

    const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(profile?.name ?? '');
    const [location, setLocation] = useState<string>(profile?.location ?? '');
    const [email, setEmail] = useState<string>(profile?.email ?? '');
    const [website, setWebsite] = useState<string>(profile?.website ?? '');
    const [privateAccess, setPrivateAccess] = useState<number>(profile?.privateAccess ?? 0);


    useEffect(() => {
        setIsLoadingProfile(true);
        ApiClient.get<IProfile>('/profiles/me')
            .then((res) => {
                dispatch(storeProfile(res));
                setName(res.name ?? '');
                setLocation(res.location ?? '');
                setEmail(res.email ?? '');
                setWebsite(res.website ?? '');
                setPrivateAccess(res.privateAccess ?? 0);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoadingProfile(false);
            });
    }, [dispatch, setIsLoadingProfile]);



    const handleSaveClick = () => {
        setIsLoadingProfile(true);
        ApiClient.put<IProfile>('/profiles', {
            ...profile,
            name,
            location,
            email,
            website,
            privateAccess
        }).then((res) => {
            dispatch(storeProfile(res));

            setName(res.name ?? '');
            setLocation(res.location ?? '');
            setEmail(res.email ?? '');
            setWebsite(res.website ?? '');
            setPrivateAccess(res.privateAccess ?? 0);

            setEditMode(false);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoadingProfile(false);
            setEditMode(false);
        });
    };

    return (

        <>
            {isLoadingProfile
                ? <div>
                    <CameraSpinner size='medium' />
                </div>
                :
                <div className='flex flex-col w-full justify-center items-center p-1'>
                    {/* name */}
                    <div className='w-3/4 flex flex-row justify-center items-center gap-2 py-2'>
                        {!editMode
                            ?
                            <h1 className='text-main-col text-5xl font-bold text-center'>{name}</h1>
                            :
                            <input
                                value={name} onChange={(e) => setName(e.target.value)}
                                className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent' type="text" />
                        }
                        {!editMode ? <i
                            onClick={() => setEditMode(!editMode)}
                            className='p-2 fas fa-pen 
                                hover:text-main-col hover:cursor-pointer hover:scale-105
                                border border-main-col rounded-xl' />
                            :
                            <i
                                className='p-2 fas fa-save
                        text-primary-cl bg-primary-bg
                    hover:text-main-col hover:cursor-pointer hover:scale-105
                    border border-main-col rounded-xl'
                                onClick={handleSaveClick}
                            />
                        }
                    </div>

                    <div className='w-3/4 flex flex-row justify-center items-center gap-2 py-1'>
                        <i className='p-1 fa-solid fa-location-dot' />
                        {!editMode ? <p className='text-xs w-full'>{location || 'no location provided'}</p>
                            : <input
                                value={location} onChange={(e) => setLocation(e.target.value)}
                                className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                                type="text" />
                        }
                    </div>
                    <p>{profile.bio}</p>

                    <div className='w-3/4 flex flex-row justify-center items-center gap-2 py-1'>
                        <i className='p-1 fa-solid fa-globe' />
                        {!editMode
                            ?
                            <div className='w-full flex flex-row justify-center items-center gap-2'>
                                <a
                                    href={website}
                                    className='w-full text-xs cursor-pointer font-thin hover:text-main-col'>{website || 'no web site provided'}</a>
                            </div>
                            : <input
                                value={website} onChange={(e) => setWebsite(e.target.value)}
                                className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                            />
                        }
                    </div>

                    <div className='w-3/4 flex flex-row justify-center items-center gap-2 py-1'>
                        <i className='p-1 fa-solid fa-envelope' />
                        {!editMode
                            ? <p className='text-xs w-full'>{email || 'no email provided'}</p>
                            : <input
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                            />}
                    </div>


                    <div className='w-3/4 flex flex-row justify-center items-center gap-2 py-1'>
                        <i className='p-1 fa-solid fa-shield' />
                        {!editMode ?
                            <p className='text-xs w-full'>{profile.privateAccess === 1 ? 'private' : 'public'}</p>
                            :
                            <>
                                <select
                                    className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                                    value={privateAccess}
                                    onChange={(e) => setPrivateAccess(parseInt(e.target.value))}
                                >
                                    <option value={0}>public</option>
                                    <option value={1}>private</option>
                                </select>
                            </>
                        }
                    </div>
                </ div>
            }
        </>
    );
};

export default ProfileInfoComponent;