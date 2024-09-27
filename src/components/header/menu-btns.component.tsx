import React from 'react';
import ToggleThemeComponent from '../toggle-theme.component';
import { useNavigate } from 'react-router-dom';

interface Props {
    onClick: () => void;
}

const MenuBtnsComponent: React.FC<Props> = ({ onClick }) => {

    const navigate = useNavigate();

    const MenuClassName = `
                
                transition-all ease-in-out delay-0
                active:bg-primary-bg hover:decoration-neutral-600
                cursor-pointer 
                hover:scale-105
                hover:text-main-col 
                hover:bg-secondary-bg
                justify-end items-center
                flex
                `;

    return (
        <>
            <div className={MenuClassName}
                onClick={() => {
                    navigate('/');
                    onClick();
                }}
            >
                <i className='p-1 fa-solid fa-home' />
                <span className='p-1 uppercase text-sm'>
                    Home</span>
            </div>
            <span className='p-1 hidden md:block'>/</span>
            <div className={MenuClassName}
                onClick={() => {
                    navigate('/notification');
                    onClick();
                }}
            >
                <i className='p-1 fa-solid fa-bell' />
                <span className='p-1 uppercase text-xs'>notif</span>
            </div>
            <span className='p-1 hidden md:block'>/</span>
            <div
                onClick={() => {
                    navigate('/profile');
                    onClick();
                }}
                className={MenuClassName}>
                <i className='p-1 fa-solid fa-user' />
                <span className='p-1 uppercase text-sm'>Profile</span>
            </div>
            <span className='p-1 hidden md:block'>/</span>
            <div
                onClick={() => { navigate('/gallery'); onClick(); }}
                className={MenuClassName}
            >
                <i className='p-1 fa-solid fa-image' />
                <span className=' p-1 uppercase text-sm'>Gallery</span>
            </div>
            <span className='p-1 hidden md:block'>/</span>
            <ToggleThemeComponent />
        </>
    );
};

export default MenuBtnsComponent;