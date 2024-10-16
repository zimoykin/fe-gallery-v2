import React, { useEffect, useState } from 'react';
import { IProfile } from '../../interfaces/profile.interface';
import { ApiClient } from '../../networking';
import { useDispatch } from 'react-redux';
import { storeProfile } from '../../features/profile/profile-slice';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import { ILocation } from '../../interfaces/location.interface';
import { Link } from 'react-router-dom';
import CategorySelect from '../category-select.component';


interface Props {
    profile: IProfile;
    editMode: boolean;
    location?: ILocation;
    onSave: () => void;
    onCancel: () => void;
    onEditClick: () => void;
    resolveAddressByTitle: (address: string) => void;
}
const ProfileInfoComponent: React.FC<Props> = ({
    profile,
    editMode,
    onSave,
    onEditClick,
    location,
    resolveAddressByTitle
}) => {

    const dispatch = useDispatch();

    const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);

    const [name, setName] = useState<string>(profile?.name ?? '');
    const [locationTitle, setLocationTitle] = useState<string>(profile?.location?.title ?? '');
    const [latitude, setLatitude] = useState<number>(profile?.location?.lat ?? 46.227638);
    const [longitude, setLongitude] = useState<number>(profile?.location?.long ?? 12.567381);
    const [distance, setDistance] = useState<number>(profile?.location?.distance ?? 25);
    const [category, setCategory] = useState<string[]>(profile?.categories ?? []);

    const [email, setEmail] = useState<string>(profile?.email ?? '');
    const [website, setWebsite] = useState<string>(profile?.website ?? '');
    const [privateAccess, setPrivateAccess] = useState<string>(profile?.privateAccess === true ? 'private' : 'public');

    useEffect(() => {
        if (location?.lat)
            setLatitude(location!.lat);

        if (location?.long)
            setLongitude(location?.long);

        if (location?.distance)
            setDistance(location?.distance);

        if (location?.title)
            setLocationTitle(location?.title);
    }, [location]);

    useEffect(() => {
        setIsLoadingProfile(true);
        ApiClient.get<IProfile>('/profiles/me')
            .then((res) => {
                dispatch(storeProfile(res));
                setName(res.name ?? '');
                setLocationTitle(res.location?.title ?? '');
                setDistance(res.location?.distance ?? 0);
                setLatitude(res.location?.lat ?? 0);
                setLongitude(res.location?.long ?? 0);
                setEmail(res.email ?? '');
                setWebsite(res.website ?? '');
                setPrivateAccess(res.privateAccess === true ? 'private' : 'public');
                setCategory(res.categories ?? []);
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
        ApiClient.put<string, IProfile>('/profiles', {
            ...profile,
            name,
            location: {
                distance: distance,
                lat: latitude,
                long: longitude,
                title: locationTitle,
            } as ILocation,
            email,
            website,
            categories: category,
            privateAccess: privateAccess === 'private' ? true : false,
        }).then(() => {
            onSave();
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoadingProfile(false);
            onSave();
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
                            onClick={() => onEditClick()}
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
                        {!editMode ? <p className='text-xs w-full'>{locationTitle || 'no location provided'}</p>
                            : <div className='w-full flex flex-row justify-center items-center gap-2'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    resolveAddressByTitle(locationTitle);
                                }}>
                                    <input
                                        value={locationTitle} onChange={(e) => {
                                            setLocationTitle(e.target.value);
                                        }}
                                        className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                                        type="text" />
                                </form>
                                <input
                                    className='w-1/4 p-2 text-xs border border-main-col rounded-md bg-transparent'
                                    type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
                            </div>
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
                            <p className='text-xs w-full'>{profile.privateAccess === true ? 'private' : 'public'}</p>
                            :
                            <>
                                <select
                                    className='w-full p-2 text-xs border border-main-col rounded-md bg-transparent'
                                    value={privateAccess}
                                    onChange={(e) => setPrivateAccess(e.target.value)}
                                >
                                    <option value={'public'}>public</option>
                                    <option value={'private'}>private</option>
                                </select>
                            </>
                        }
                    </div>

                    <div
                        className='w-3/4 flex flex-row justify-center items-center gap-2 py-1'>
                        {editMode ?
                            <CategorySelect />
                            :

                            <div className='w-full flex flex-col justify-start items-start gap-2 py-1 border-t border-b border-main-col'>
                                {category?.map((category, index) => (
                                    <div>
                                        <i className='p-1 fas fa-tag' />
                                        <span key={index} className='text-xs'>  {category} </span>
                                    </div>
                                ))}
                            </div>

                        }
                    </div>

                    {!editMode && <Link
                        // target='_blank'
                        to='/profile/offers'>
                        <br />
                        <div className='hover:bg-secondary-bg hover:scale-105'>
                            <i className="fas fa-external-link p-2 text-highlight-cl" />
                            <span className='underline text-highlight-cl'>
                                edit your offers
                            </span>
                        </div>
                    </Link>}
                </ div>
            }
        </>
    );
};

export default ProfileInfoComponent;