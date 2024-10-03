import React, { useEffect, useState } from 'react';
import { useLocale, translate } from '../../contexts/locale';
import { IProfile } from '../../interfaces/profile.interface';
import PalitraComponent from '../palitra/palitra.component';
import Avatar from '../avatar/avatar-component';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '../../networking';

const UserTopListComponent: React.FC = () => {

    const navigate = useNavigate();
    const { locale } = useLocale();
    const {
        userTopList
    } = translate[locale];

    // states
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IProfile[]>([]);

    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<IProfile[]>('/public/profiles').then((res) => {
            setUsers(res);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoading(false);
        });

    }, [setIsLoading, setUsers]);

    return (
        <>
            <div className='flex w-full h-full flex-col justify-center items-center text-secondary-col
            '>
                <h1 className='font-bold text-sm bg-yellow-400 text-black w-full p-2 uppercase'> {userTopList}</h1>
                <div className='h-full w-full min-h-10 gap-1'>
                    {isLoading && <div className='p-2'>
                        <PalitraComponent size='mini' />
                    </div>
                    }
                    {!isLoading && users.map((user, index) => (
                        <div
                            onClick={() => {
                                navigate(`/gallery/${user.id}`);
                            }}
                            key={index}
                            className='w-full flex justify-start p-1 items-center bg-main-bg-75
                            shadow-md hover:scale-103 hover:shadow-xl transition-all duration-300
                            '>
                            <div className='p-1'>
                                <Avatar url={user.url} size='micro' />
                            </div>
                            <span className='text-main-col text-sm text-shadow-sm'>
                                {user.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default UserTopListComponent;