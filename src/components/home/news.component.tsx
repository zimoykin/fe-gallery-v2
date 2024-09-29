import React, { useEffect, useState } from 'react';
import Avatar from '../avatar/avatar-component';
import { IProfile } from '../../interfaces/profile.interface';
import { MockUsers } from '../../mocki/users.mock';
import { translate, useLocale } from '../../contexts/locale';
import { useNavigate } from 'react-router-dom';


interface Props {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
}

const NewsComponent: React.FC<Props> = ({ item }) => {

    const navigate = useNavigate();

    //vocabs
    const { locale } = useLocale();
    const { readMore, collapse } = translate[locale];

    //states
    const [profile, setProfile] = useState<IProfile>();
    const [isPreview, setIsPreview] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            if (MockUsers.some((user) => user.id === item.profileId))
                setProfile(MockUsers.find((user) => user.id === item.profileId));
        }, Math.random() * 3000);
    }, [item.profileId]);


    return (
        <div
            className="w-full"
        >

            <div className='flex flex-col w-full h-full justify-start items-center bg-command-panel-bg p-1'>

                <div className='flex w-full justify-start items-center'>
                    <div
                        onClick={() => {
                            navigate(`/gallery/${profile?.id}`);
                        }}
                        className='
                    hover:scale-105 hover:bg-main-bg
                    min-w-36 flex justify-start items-center gap-1 border p-1'>
                        <Avatar url={profile?.url} size='micro' />
                        <span>{profile?.name}</span>
                    </div>
                    <span
                        className='font-bold md:text-xl text-sm w-full p-2 lowercase
                        text-shadow-sm 
                        '
                    >{item.title}</span>
                </div>
                <hr />
                <p className='p-1'>
                    {String(item.text).slice(0, isPreview ? 200 : item.text.length)}
                </p>
                <div className='w-full p-1 pr-4 flex justify-end items-end'>
                    <a
                        onClick={() => setIsPreview(!isPreview)}
                        className='text-md cursor-pointer hover:scale-125'>{!isPreview ? collapse : readMore}...</a>
                </div>
            </div>

        </div>
    );
};

export default NewsComponent;