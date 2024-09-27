import React from 'react';
import NavBarComponent from './nav-bar.component';

const HeaderComponent: React.FC = () => {
    return (
        <header className='
        w-full flex justify-center 
        absolute top-0 left-1/2 -translate-x-1/2 bg-secondary-bg p-5 z-50 max-h-20'>
            <NavBarComponent />
        </header>
    );
};

export default HeaderComponent;