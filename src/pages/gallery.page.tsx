import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockUsers } from '../mocki/users.mock';
import { IProfile } from '../interfaces/profile.interface';
import HeaderGalleryComponent from '../components/gallery/header-gallery.component';
import ContentGalleryComponent from '../components/gallery/content-gallery.component';
import CameraSpinner from '../components/camera-spinner/camera-spinner.component';

const GalleryPage: React.FC = () => {

    const { profileId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //states
    const [profile, setProfile] = useState<IProfile>();

    useEffect(() => {
        if (profileId) {
            setIsLoading(true);
            setTimeout(() => {
                //TODO: implement api call instead of fake request
                const profile = MockUsers.find((user) => user.id === profileId);
                if (profile) {
                    setProfile(profile);
                }
                else {
                    setError(`Oh no! profile ${profileId} not found! 😱`);
                }

                setIsLoading(false);
            }, 3000 * Math.random());
        }
    }, [profileId, setProfile]);


    return (

        <>
            {
                error ?
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='p-5 w-full flex justify-center items-center bg-main-bg'>
                            <span className='text-3xl text-highlight-cl'>
                                {error}
                            </span>
                        </div>
                    </div>
                    :
                    <div className='w-full h-full flex flex-col justify-start items-start'>
                        {/* header */}
                        <div className='
                                        w-full h-auto p-2 
                                        flex justify-start items-start
                                        bg-main-bg-75
                                        '>
                            {!isLoading
                                ?
                                <HeaderGalleryComponent profile={profile} />
                                :
                                <div className='p-2 flex justify-center items-center w-full' >
                                    <CameraSpinner size='small' />
                                </div>
                            }
                        </div>


                        {/* content */}
                        <div className='w-full h-full flex mt-2 bg-main-bg-75 md:overflow-auto'>
                            {profile && <ContentGalleryComponent profileId={profile.id} />}
                        </div>

                    </div>
            }
        </>
    );
};

export default GalleryPage;