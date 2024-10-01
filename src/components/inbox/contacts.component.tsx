import React, { useEffect, useState } from 'react';
import { IProfile } from '../../interfaces/profile.interface';
import { MockUsers } from '../../mocki/users.mock';
import Avatar from '../avatar/avatar-component';
import PalitraComponent from '../palitra/palitra.component';

interface Props {
    onSelectUser?: (user: IProfile) => void;
}

const ContactsComponent: React.FC<Props> = ({ onSelectUser }) => {

    // const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    //states
    const [isLoadingContacts, setIsLoadingContacts] = useState(false);
    const [users, setUsers] = useState<IProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<IProfile>();

    useEffect(() => {
        setIsLoadingContacts(true);
        //TODO: fetch users from api
        setTimeout(() => {
            setUsers(MockUsers);
            setIsLoadingContacts(false);
        }, 3000 * Math.random());
    }, [setIsLoadingContacts, setUsers]);

    return <>

        {!isLoadingContacts ? <div className='flex justify-start items-center md:items-start flex-col md:p-2'>
            {
                users?.map((user, index) => (
                    <div key={index}
                        onClick={() => {
                            setSelectedUser(user);
                            if (onSelectUser)
                                onSelectUser(user);
                        }}
                        className={`w-full flex justify-start items-center md:p-2 p-1 gap-2
                        hover:bg-command-panel-bg hover:scale-102 transition ease-in-out delay-75
                        ${selectedUser?.id === user.id && 'border bg-secondary-bg shadow-sm scale-101'}
                        `}>
                        <Avatar url={user.url} size='micro' />
                        <span className='hidden md:block'>{user.name}</span>
                        <span className='block md:hidden text-main-col'>{user.name?.split(' ').map((name) => name[0]).join('') ?? ''}</span>
                    </div>
                ))
            }
        </div>
            : <div>
                <PalitraComponent size='mini' />
            </div>}
    </>;

};


export default ContactsComponent;