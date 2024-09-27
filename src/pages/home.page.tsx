import React from 'react';

const HomePage: React.FC = () => {
    document.title = 'Home | Gallery | React';
    return (
        <div className="flex w-full h-full flex-col justify-center items-center">
            <h1 className="text-secondary-col text-6xl md:text-9xl font-extrabold">HOME PAGE</h1>
        </div>
    );
};

export default HomePage;