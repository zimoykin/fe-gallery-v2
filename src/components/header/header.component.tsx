import React from 'react';
import NavBarComponent from './nav-bar.component';

const HeaderComponent: React.FC = () => {
    return (
        <header className='w-full
            flex justify-center 
            fixed 
            top-0 
            md:left-1/2 md:-translate-x-1/2
            bg-secondary-bg z-50 max-h-20
            '
        >
            <div className='flex grow p-2 md:p-0 md:pt-2 md:pb-2 max-w-screen-2xl'>
                <NavBarComponent />
            </div>
        </header>
    );
};

export default HeaderComponent;