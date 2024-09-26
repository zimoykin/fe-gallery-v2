import React from 'react';

const HeaderComponent: React.FC = () => {
    return (
        <header className='w-full flex justify-center absolute top-0 left-1/2 -translate-x-1/2 bg-secondary-bg p-5'>
            <div className='w-full max-w-normal-screen bg-main-bg'>
                <h1>
                    Hello!
                </h1>
            </div>
        </header>
    );
};

export default HeaderComponent;