import React, { useEffect, useState } from 'react';
import { IProfile } from '../interfaces/profile.interface';
import { ApiClient } from '../networking';
import MapComponent from '../maps/map.component';
import ProfilesMapSearchComponent from '../maps/profiles.component';

const MapsPage: React.FC = () => {

    const [search, setSearch] = useState<string | null>(null);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<IProfile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);
    const [hoverProfile, setHoverProfile] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);

    const [radius, setRadius] = useState<number>(100);

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
            try {
                const res = await ApiClient.post<IProfile[]>('/public/profiles/geo-search', {
                    radius,
                    lat: userLocation?.lat ?? 0,
                    lng: userLocation?.lng ?? 0
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
    }, [userLocation, radius]);


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

        <div className="w-full h-full flex">
            <div className="h-full md:w-1/5 w-1/3">
                <form
                    className='sticky top-0 bg-main-bg shadow-md rounded-md p-1'
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateProfile();
                    }}>
                    <div>
                        <input
                            value={search ?? ''}
                            onChange={(e) => setSearch(e.target.value)}
                            className='p-1 text-center bg-main-bg shadow-md rounded-md w-full'
                            type="text"
                            placeholder="Search"
                        />
                    </div>


                    <div className='bg-main-bg shadow-md rounded-md p-1
                    flex flex-row
                    '>
                        <input
                            max={200}
                            min={1}
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className='w-3/4 p-1' type="range" />
                        <span className='absolute w-1/4 text-center right-0'>{radius}</span>
                    </div>
                </form>

                <ProfilesMapSearchComponent
                    filteredProfiles={filteredProfiles}
                    setHoverProfile={setHoverProfile}
                    setSelectedProfile={setSelectedProfile}
                    updateProfile={updateProfile}
                />
            </div>
            <div className='bg-fuchsia-400 w-full h-full'>
                <MapComponent
                    filteredProfiles={filteredProfiles}
                    hoveredProfile={hoverProfile}
                    selectedProfile={selectedProfile}
                    radius={radius}
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
    );
};

export default MapsPage;
