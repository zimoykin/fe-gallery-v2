import React from 'react';
import UserTopList from '../components/home/user-top-list.component';

const HomePage: React.FC = () => {
    document.title = 'Home | Gallery | React';
    return (
        <div className="flex p-3 w-full md:w-1/5 bg-secondary-bg-75 flex-col justify-start items-start">
            <UserTopList />
        </div>
    );
};

export default HomePage;