import React, { useEffect, useState } from 'react';
import { translate, useLocale } from '../contexts/locale';
import ContactsComponent from '../components/inbox/contacts.component';
import ChatComponent from '../components/inbox/chat.component';
import { IProfile } from '../interfaces/profile.interface';

const InboxPage: React.FC = () => {

    const { locale } = useLocale();
    const { inbox } = translate[locale];

    //states
    const [selectedUser, setSelectedUser] = useState<null | IProfile>(null);
    //set title
    useEffect(() => {
        document.title = `${inbox} | Gallery | React`;
    }, [locale, inbox]);



    return <div className='flex w-full h-full justify-center items-center'>
        {/* left - chats */}
        <div className='md:w-1/3 w-3/12 h-full p-1 bg-main-bg overflow-auto'>
            <h1 className='text-2xl break-words text-center md:text-4xl text-highlight-cl text-shadow-md'>{inbox}</h1>
            {/* contacts list */}
            <ContactsComponent
                onSelectUser={setSelectedUser}
            />
        </div>

        {/* right - messages */}
        <div className='md:w-2/3 w-9/12 h-full bg-main-bg-75 relative'>
            <ChatComponent profileId={selectedUser?.id} />
        </div>

    </div>;
};

export default InboxPage;