import React, { useEffect, useRef, useState } from 'react';
import { IProfile } from '../interfaces/profile.interface';
import { ApiClient } from '../networking';
import MapComponent from '../maps/map.component';
import ProfilesMapSearchComponent from '../maps/profiles.component';
import CategorySelect from '../components/category-select.component';
import { useSearchParams } from 'react-router-dom';

const MapsPage: React.FC = () => {

    const [search, setSearch] = useState<string | null>(null);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<IProfile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);
    const [hoverProfile, setHoverProfile] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [radius, setRadius] = useState<number>(100);
    const [distance, setDistance] = useState<number>(100);

    const [params, setParams] = useSearchParams();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const location = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
            setUserLocation(location);
        }, console.error);
    }, []);


    useEffect(() => {
        const fetchProfiles = async () => {
            const selectedCategory = params.get('categories')?.split(',') ?? [];
            try {
                const res = await ApiClient.post<IProfile[]>('/public/profiles/geo-search', {
                    radius,
                    lat: userLocation?.lat ?? 0,
                    lng: userLocation?.lng ?? 0,
                    categories: selectedCategory
                });
                setProfiles(res);
                setFilteredProfiles(res);
            } catch (error) {
                console.error(error);
            }
        };
        if (userLocation?.lat && userLocation?.lng) {
            fetchProfiles();
        }
    }, [userLocation, radius, params]);

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        let newDistance = Number(event?.target?.value);
        if (isNaN(newDistance))
            newDistance = 100;
        setDistance(newDistance);

        //lets reduce requests to the server
        timeoutRef.current = setTimeout(() => {
            setRadius(newDistance);
            params.set('radius', newDistance.toString());
            setParams(params);
        }, 500);
    };

    useEffect(() => {
        if (params.has('radius')) {
            const parameterRadius = params.get('radius');
            if (!parameterRadius) return;

            const radiusInt = parseInt(parameterRadius);
            if (isNaN(radiusInt)) return;

            setRadius(Number(params.get('radius')));
            setDistance(Number(params.get('radius')));
        }
    }, [params]);


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
        <div className="w-full h-full flex md:flex-row flex-col-reverse justify-start items-start ">
            <div className=' md:w-1/4 md:h-full grid'>
                <ProfilesMapSearchComponent
                    filteredProfiles={filteredProfiles}
                    setHoverProfile={setHoverProfile}
                    setSelectedProfile={setSelectedProfile}
                    updateProfile={updateProfile}
                />
            </div>

            <div className='w-full h-full flex flex-col grow justify-start items-start'>
                <div className="w-full flex-row">
                    <form
                        className='top-0 w-full bg-main-bg shadow-md rounded-md p-1'
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateProfile();
                        }}>
                        <div className='flex w-full flex-row justify-center items-center gap-1'>
                            <div className='w-full'>
                                <input
                                    value={search ?? ''}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='p-1 w-full text-center bg-main-bg shadow-md rounded-md'
                                    type="text"
                                    placeholder="Search"
                                />
                            </div>
                            <div className='flex justify-end'>
                                <CategorySelect />
                            </div>
                        </div>

                        <div className='bg-main-bg shadow-md rounded-md p-1
                    flex flex-row
                    '>
                            <input
                                max={200}
                                min={1}
                                value={distance}
                                onChange={e => handleRadiusChange(e)}
                                className='w-3/4 p-1' type="range" />
                            <span className='absolute w-1/4 text-center right-0'>{radius}</span>
                        </div>
                    </form>
                </div>
                <div className='w-full h-full flex justify-start items-start grow '>
                    <MapComponent
                        filteredProfiles={filteredProfiles}
                        hoveredProfile={hoverProfile}
                        selectedProfile={selectedProfile}
                        radius={distance}
                        userLocation={userLocation}
                        onDragstart={() => {
                            setSelectedProfile(null);
                        }}
                        userLocationChanged={(lat, lng) => {
                            setUserLocation({ lat, lng });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapsPage;
