import React from 'react';
import { IProfile } from '../interfaces/profile.interface';
import ProfileCardComponent from './profile-card.component';

interface Props {
    filteredProfiles: IProfile[];
    setHoverProfile: (profileId: string | null) => void;
    setSelectedProfile: (profile: IProfile | null) => void;
    updateProfile: () => void;
}

const ProfilesMapSearchComponent: React.FC<Props> = ({ filteredProfiles, setHoverProfile, setSelectedProfile }) => {

    return (
        <div className="w-full flex md:flex-col flex-row overflow-auto">
            {filteredProfiles.map((profile, i) => (
                <ProfileCardComponent
                    profile={profile}
                    setHoverProfile={setHoverProfile}
                    setSelectedProfile={setSelectedProfile}
                    key={profile.id ?? i}
                />
            ))}
        </div>

    );
};

export default ProfilesMapSearchComponent;