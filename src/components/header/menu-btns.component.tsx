import React from 'react';
import ToggleThemeComponent from '../toggle-theme.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocale } from '../../contexts/locale';
import translate from '../../contexts/locale/locale';
import { logout } from '../../features/auth/auth-slice';

interface Props {
    onClick: () => void;
}

const MenuBtnsComponent: React.FC<Props> = ({ onClick }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { locale, toggleLocale } = useLocale();
    const { home, profile, gallery, notification, login, logout: logOutTitle } = translate[locale];

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
                <i className='p-2 fa-solid fa-home' />
                <span className='p-2 uppercase text-sm'>
                    {home}</span>
            </div>
            <span className='p-2 hidden md:block'>/</span>
            <div className={MenuClassName}
                onClick={() => {
                    navigate('/notification');
                    onClick();
                }}
            >
                <i className='p-2 fa-solid fa-bell' />
                <span className='p-2 uppercase text-xs'>{notification}</span>
            </div>
            <span className='p-2 hidden md:block'>/</span>
            <div
                onClick={() => {
                    navigate('/profile');
                    onClick();
                }}
                className={MenuClassName}>
                <i className='p-1 fa-solid fa-user' />
                <span className='p-1 uppercase text-sm'>{profile}</span>
            </div>
            <span className='p-2 hidden md:block'>/</span>
            <div
                onClick={() => { navigate('/gallery'); onClick(); }}
                className={MenuClassName}
            >
                <i className='p-2 fa-solid fa-image' />
                <span className=' p-2 uppercase text-sm'>{gallery}</span>
            </div>
            <span className='p-2 hidden md:block'>//</span>

            <div className='flex justify-end items-center md:justify-start md:items-start'>
                <hr className='md:hidden w-2/3 p-1' />
            </div>

            <div className='p-2'>
                <ToggleThemeComponent />
            </div>

            <span className='p-2 hidden md:block'>/</span>
            <div
                onClick={() => { navigate('/gallery'); onClick(); }}
                className={MenuClassName}
            >
            </div>

            <div
                onClick={() => {
                    toggleLocale();
                }}
                className={MenuClassName}
            >
                <i className='p-1 fa-solid fa-flag' />
                <span
                    className='p-1 uppercase hover:bg-secondary-bg rounded-md'>{locale}
                </span>
            </div>

            <div className='w-full flex justify-end items-center'>
                <hr className='md:hidden w-2/3 p-1' />
            </div>

            <div className='absolute p-1 right-0'>
                <div className='flex md:flex-row flex-col gap-1 justify-end items-end'>
                    <div className='p-1 right-0 border border-main-col hover:bg-danger-bg rounded-md'
                        onClick={
                            handleOnClickLoginBtn
                        }
                    >
                        <i className='fa-solid fa-arrow-right-from-bracket' />
                        <span className='uppercase text-sm'>{isAuthenticated ? logOutTitle : login}</span>
                    </div>
                </div>
            </div>
        </ div>
    );
};

export default MenuBtnsComponent;