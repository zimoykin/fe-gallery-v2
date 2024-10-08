import React, { useEffect, useState, useRef } from 'react';
import PalitraComponent from '../palitra/palitra.component';
import { translate, useLocale } from '../../contexts/locale';
import { ChatMessage } from '../../interfaces/chat-message.interface';
import Avatar from '../avatar/avatar-component';
import { IProfile } from '../../interfaces/profile.interface';
import { MockUsers } from '../../mocki/users.mock';
import { getMessages } from '../../mocki/messages.mock';

interface Props {
    profileId?: string;
}

const ChatComponent: React.FC<Props> = ({ profileId }) => {
    const { locale } = useLocale();
    const { toStartChatPleaseSelectProfile } = translate[locale];

    // states
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');

    const [sender, setSender] = useState<IProfile | null>(null);
    const [receiver, setReceiver] = useState<IProfile | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (profileId) {
            setSender(MockUsers.find(u => u.id === profileId) || null);
            setReceiver(MockUsers.find(u => u.id !== profileId) || null);
        }
    }, [profileId, setSender, setReceiver]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            if (!profileId) return;
            if (!receiver) return;
            setMessages(
                getMessages(profileId, receiver.id)
            );
            setIsLoading(false);
        }, Math.random() * 2000);
    }, [profileId, receiver]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, receiver]);

    const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (message === '') return;
        if (sender && receiver)
            setMessages(msg => [
                ...msg,
                {
                    senderId: sender?.id,
                    receiverId: receiver?.id,
                    text: message,
                    date: new Date(),
                    type: 'text',
                },
            ]);
        setMessage('');
    };

    return (
        <>
            {!profileId ? (
                <div className='flex justify-center items-center w-full h-full text-center text-main-col text-shadow-sm text-2xl font-bold break-words '>
                    {toStartChatPleaseSelectProfile}
                </div>
            ) : (
                <div className='w-full h-full flex'>
                    {isLoading ? (
                        <div className='flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <PalitraComponent size='mini' />
                        </div>
                    ) : (
                        <div className='w-full h-full relative flex flex-col justify-between p-10'>
                            <div className='flex-1 overflow-auto no-scrollbar flex flex-col-reverse'>
                                <div className='flex flex-col w-full gap-3'>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`w-full p-4 bg-secondary-bg shadow-md text-black-col flex flex-col
                                            ${message.senderId === profileId ? 'justify-end items-end' : 'items-start justify-start'}
                                            `}
                                        >
                                            <div className={`
                                                flex gap-2
                                                ${message.senderId === profileId ? 'justify-end items-end flex-row-reverse' : 'flex-row items-start justify-start'}
                                            `}>
                                                <Avatar size='micro' url={message.senderId === profileId ? sender?.url : receiver?.url} />
                                                <span>{message.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            {/* message input */}
                            <div className='w-full pb-5 shadow-md'>
                                <form className='flex w-full justify-start items-center
                                hover:cursor-pointer
                                ' onSubmit={handleSendMessage}>
                                    <i className='fas fa-paperclip p-4 hover:text-main-col hover:cursor-pointer' />
                                    <i className='fas fa-location-dot p-4 hover:text-main-col hover:cursor-pointer' />
                                    <input
                                        className='w-full text-xs p-3 bg-gray-400 text-black rounded-md'
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <div className='hover:scale-125 hover:cursor-pointer hover:shadow-md'>
                                        <i
                                            onClick={() => handleSendMessage()}
                                            className='fas fa-paper-plane p-4 pl-4 hover:text-main-col hover:cursor-pointer'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatComponent;
