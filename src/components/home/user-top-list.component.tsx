import React, { useEffect, useState } from 'react';
import { useLocale, translate } from '../../contexts/locale';
import { IProfile } from '../../interfaces/profile.interface';
import PalitraComponent from '../palitra/palitra.component';
import { MockUsers } from '../../mocki/users.mock';
import Avatar from '../avatar/avatar-component';
import { useNavigate } from 'react-router-dom';

const UserTopList: React.FC = () => {

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
        setTimeout(() => {
            //TODO: get top users
            setUsers(MockUsers);
            setIsLoading(false);
        }, 1000);

    }, []);

    return (
        <>
            <div className='flex w-full h-full flex-col justify-center items-center text-secondary-col
            '>
                <h1 className='font-bold text-sm bg-command-panel-bg w-full p-2 lowercase'> {userTopList}</h1>
                <div className='h-full w-full min-h-10 gap-1'>
                    {isLoading && <PalitraComponent size='mini' />}
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

export default UserTopList;