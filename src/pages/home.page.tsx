import React from 'react';
import UserTopListComponent from '../components/home/user-top-list.component';
import NewsListComponent from '../components/home/news-list.component';

const HomePage: React.FC = () => {
    document.title = 'Home | Gallery | React';
    return (
        <div className='flex w-full h-full flex-col md:flex-row'>
            <div className="flex p-3 w-full md:w-1/5 bg-secondary-bg-75 flex-col justify-start items-start">
                <UserTopListComponent />
            </div>

            <div className='flex p-3 w-full md:w-4/5 bg-secondary-bg-75 flex-col justify-start items-start'>
                <NewsListComponent />
            </div>
        </div>
    );
};

export default HomePage;