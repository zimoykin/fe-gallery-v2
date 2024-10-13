import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { IProfile } from '../interfaces/profile.interface';
import { ApiClient } from '../networking';
import { Map, AdvancedMarker, ColorScheme } from '@vis.gl/react-google-maps';
import { Circle } from '../maps/circle.component';
import Avatar from '../components/avatar/avatar-component';
import { useTheme } from '../contexts/theme/theme-context';

const MapsPage: React.FC = () => {
    const { theme } = useTheme();
    const [search, setSearch] = useState<string | null>(null);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<IProfile[]>([]);
    const [hoverProfile, setHoverProfile] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);
    const [center, setCenter] = useState<{ lat: number; lng: number; } | null>(null);
    const [isProfileSelected, setIsProfileSelected] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const location = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
            setUserLocation(location);
            setCenter(location);
        }, console.error);
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await ApiClient.get<IProfile[]>('/public/profiles');
                setProfiles(res);
                setFilteredProfiles(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfiles();
    }, []);

    const cachedLocation = useMemo(() => {
        return {
            lat: userLocation?.lat ?? 52.520008,
            lng: userLocation?.lng ?? 13.404954,
        };
    }, [userLocation]);

    const updateProfile = async () => {
        setFilteredProfiles(() => profiles.filter(profile => {
            if (profile.name?.toLowerCase().includes(search?.toLowerCase() ?? '')) return true;
            if (profile.location?.title?.toLowerCase().includes(search?.toLowerCase() ?? '')) return true;
            if (profile.email?.toLowerCase().includes(search?.toLowerCase() ?? '')) return true;
            if (profile.website?.toLowerCase().includes(search?.toLowerCase() ?? '')) return true;
            return false;
        }));
    };

    return (
        <div className="w-full h-full flex p-2 shadow-md">
            <div className="h-full md:w-1/5 w-1/3">
                <div className="w-full flex flex-col h-full">

                    <div className="h-full w-full overflow-y-auto no-scrollbar">
     
                        <form
                            className='sticky top-0 bg-main-bg shadow-md rounded-md p-1'
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateProfile();
                            }}>
                            <input
                                value={search ?? ''}
                                onChange={(e) => setSearch(e.target.value)}
                                className='p-1 text-center bg-main-bg shadow-md rounded-md w-full'
                                type="text"
                                placeholder="Search"
                            />
                        </form>
                        {filteredProfiles.map((profile, i) => (
                            <div
                                onMouseEnter={() => setHoverProfile(profile.id)}
                                onMouseLeave={() => setHoverProfile(null)}
                                key={profile.id ?? i} className='w-full p-1 flex md:flex-col flex-row '>
                                <div
                                    onClick={() => {
                                        setIsProfileSelected(true);
                                        setCenter({
                                            lat: profile.location!.lat,
                                            lng: profile.location!.long,
                                        });
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
                </div>
            </div>
            <div className='h-full flex grow p-1'>
                <Map
                    mapId={'gallery-map'}
                    defaultZoom={9}
                    defaultCenter={cachedLocation}
                    center={isProfileSelected ? center : null}
                    streetViewControl={false}
                    onDragstart={() => setIsProfileSelected(false)}
                    colorScheme={
                        theme === 'dark'
                            ? ColorScheme.DARK
                            : theme === 'light'
                                ? ColorScheme.LIGHT
                                : ColorScheme.FOLLOW_SYSTEM
                    }
                >
                    {filteredProfiles
                        .filter((profile) => profile.location && profile.location.lat && profile.location.long)
                        .map((profile, i) => (
                            <Fragment key={profile.id ?? i}>
                                <AdvancedMarker
                                    position={{
                                        lat: profile.location!.lat,
                                        lng: profile.location!.long,
                                    }}
                                >
                                    <div className='flex shadow-md'>
                                        <Avatar url={profile.url} size={(profile.id === hoverProfile) ? 'mini' : 'micro'} />
                                    </div>
                                    <Circle
                                        onClick={() => {
                                            setCenter({
                                                lat: profile.location!.lat,
                                                lng: profile.location!.long,
                                            });
                                            setIsProfileSelected(true);
                                        }}
                                        center={{
                                            lat: profile.location!.lat,
                                            lng: profile.location!.long,
                                        }}
                                        radius={(profile.location?.distance ?? 15) * 1000}
                                        fillColor={profile.id === hoverProfile ? 'red' : 'green'}
                                        strokeWeight={0}
                                    />
                                </AdvancedMarker>
                            </Fragment>
                        ))}
                </Map>
            </div>
        </div>
    );
};

export default MapsPage;
