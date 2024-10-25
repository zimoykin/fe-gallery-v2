import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Location {
    latitude: number;
    longitude: number;
}

interface LocationContextType {
    location: Location | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
    children: ReactNode;
}

export const UserLocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        const handleSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        };

        const handleError = (error: GeolocationPositionError) => {
            console.error(error);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }
    }, []);

    return (
        <LocationContext.Provider value={{ location }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useUserLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};