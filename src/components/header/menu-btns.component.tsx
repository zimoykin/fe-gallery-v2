import React, { useEffect } from 'react';
import ToggleThemeComponent from '../toggle-theme.component';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocale, translate } from '../../contexts/locale';
import { logout } from '../../features/auth/auth-slice';
import { storeLocale } from '../../features/locale/locale-slice';

interface Props {
    onClick?: () => void;
}

const MenuBtnsComponent: React.FC<Props> = ({ onClick }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { locale: storedLocale } = useSelector((state: RootState) => state.locale);
    const { profile: storedProfile } = useSelector((state: RootState) => state.profile);
    const { locale, toggleLocale, setLocaleFromStorage } = useLocale();
    const { home, profile, gallery, inbox, login, logout: logOutTitle } = translate[locale];

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const MenuClassName = `
                transition-all ease-in-out delay-0
                active:bg-primary-bg hover:decoration-neutral-600
                cursor-pointer 
                hover:scale-105
                hover:text-main-col 
                hover:bg-secondary-bg
                justify-end items-center
                flex p-2 md:p-1 
                `;

    useEffect(() => {
        if (storedLocale)
            setLocaleFromStorage(storedLocale);
    }, [storedLocale, setLocaleFromStorage]);

    useEffect(() => {
        dispatch(storeLocale(locale));
    }, [toggleLocale, dispatch, locale]);
    const handleOnClickLoginBtn = () => {
        if (isAuthenticated) {
            dispatch(logout());
        }
        else {
            navigate('/login');
        }
    };

    const handleOnOnToggleLocale = () => {
        toggleLocale();
    };

    return (
        < div className=' relative md:flex justify-start items-center w-full h-full'>
            {/* home */}
            <Link to='/'>
                <div className={MenuClassName}
                    onClick={() => {
                        if (onClick) onClick();
                    }}
                >
                    <i className='p-1 fa-solid fa-home' />
                    <span className='md:p-1 uppercase text-sm'>
                        {home}</span>
                </div>
            </Link>
            <span className='md:p-1 hidden md:block'>/</span>
            {/* inbox */}
            <Link to='/inbox'>
                <div className={MenuClassName}
                    onClick={() => {
                        if (onClick) onClick();
                    }}
                >
                    <i className='p-1 fas fa-inbox' />
                    <span className='md:p-1 uppercase text-xs'>{inbox}</span>
                </div>
            </Link>
            <span className='md:p-1 hidden md:block'>/</span>
            {/* profile */}
            <Link to={'/profile'}>
                <div
                    onClick={() => {
                        if (onClick) onClick();
                    }}
                    className={MenuClassName}>
                    <i className='p-1 fa-solid fa-user' />
                    <span className='md:p-1 uppercase text-sm'>{profile}</span>
                </div>
            </Link>
            <span className='p-1 hidden md:block'>/</span>

            {/* gallery */}
            <Link to={`/gallery/${storedProfile?.id}`}>
                <div
                    onClick={() => { if (onClick) onClick(); }}
                    className={MenuClassName}
                >
                    <i className='p-1 fa-solid fa-image' />
                    <span className='md:p-1 uppercase text-sm'>{gallery}</span>
                </div>

            </Link>
            <span className='md:p-1 hidden md:block'>//</span>

            {/* system */}
            <div className='flex justify-end items-center md:justify-start md:items-start'>
                <hr className='md:hidden w-2/3 p-1' />
            </div>

            <div className='md:p-1 hover:bg-secondary-bg rounded-md'>
                <ToggleThemeComponent />
            </div>

            {/* <i className="fas fa-user-astronaut"></i> */}

            {/* <span className='md:p-1 hidden md:block'>/</span>
            <Link to={'/gallery'}>
                <div
                    className={MenuClassName}
                />
            </Link> */}

            <div
                onClick={handleOnOnToggleLocale}
                className={MenuClassName}
            >
                <i className='p-1 fa-solid fa-flag' />
                <span
                    className='md:p-1 uppercase hover:bg-secondary-bg rounded-md'>{locale}
                </span>
            </div>

            <div className='w-full flex justify-end items-center'>
                <hr className='md:hidden w-2/3 p-1' />
            </div>

            <div className='absolute md:p-1 right-0'>
                <div className='flex md:flex-row flex-col gap-1 justify-end items-end'>
                    <div className='flex justify-end items-end p-1 border-secondary-col right-0 hover:bg-red-400 hover:bg-opacity-45 hover:scale-105 rounded-md'
                        onClick={
                            handleOnClickLoginBtn
                        }
                    >
                        {
                            isAuthenticated
                                ? <i className="p-1 text-secondary-col fas fa-walking" />
                                : <i className="p-1 text-secondary-col fas fa-key" />
                        }
                        <span className='uppercase text-sm text-secondary-col'>{isAuthenticated ? logOutTitle : login}</span>
                    </div>
                </div>
            </div>
        </ div>
    );
};

export default MenuBtnsComponent;