import React from 'react';
import ToggleThemeComponent from '../toggle-theme.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../features/auth/auth-slice';

interface Props {
    onClick: () => void;
}

const MenuBtnsComponent: React.FC<Props> = ({ onClick }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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


    const handleOnClickLoginBtn = () => {
        if (isAuthenticated) {
            dispatch(logout());
        }
        else {
            navigate('/login');
        }
    };

    return (
        < div className=' relative md:flex justify-start items-center w-full h-full'>
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

            <hr className='md:hidden w-2/3 p-1' />
            <div className='p-1'>
                <ToggleThemeComponent />
            </div>
            <hr className='md:hidden w-2/3 p-1' />

            <div className='absolute p-1 right-0 border border-main-col hover:bg-danger-bg rounded-md'
                onClick={
                    handleOnClickLoginBtn
                }
            >
                <i className='fa-solid fa-arrow-right-from-bracket' />
                <span className='p-1 uppercase text-sm'>{isAuthenticated ? 'Logout' : 'Login'}</span>
            </div>
        </ div>
    );
};

export default MenuBtnsComponent;