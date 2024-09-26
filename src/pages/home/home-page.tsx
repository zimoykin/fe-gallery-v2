import React from 'react';
import ToggleThemeComponent from '../../components/toggle-theme.component';
import AboutComponent from '../../components/about.component';

const HomePage: React.FC = () => {
    return (
        <main className='w-screen h-screen flex flex-col justify-center items-center'
        >
            <AboutComponent />
            <ToggleThemeComponent />
        </main>
    );
};

export default HomePage;