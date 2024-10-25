import React from 'react';
import UserTopListComponent from '../components/home/user-top-list.component';
import CommercialComponent from '../components/home/commercial.component';
import ImagesHomeComponent from '../components/home/images.component';
import ForYouWidgetComponent from '../components/home/for-you-widget.component';

const HomePage: React.FC = () => {
    document.title = 'Home | Gallery | React';
    return (
        <div>
            <div className="flex w-full h-full flex-col md:flex-row md:gap-1">
                <div className="flex w-full md:w-1/6 bg-secondary-bg-75 flex-col justify-start items-start">
                    <UserTopListComponent />
                </div>
                <div className='md:w-4/6 w-full overflow-scroll no-scrollbar'>
                    <div className='bg-white p-3'>
                        <ImagesHomeComponent />
                    </div>

                </div>

                <div className="flex w-full md:w-1/5 bg-secondary-bg-75 flex-col justify-start items-start">
                    <ForYouWidgetComponent />
                </div>
            </div>

            {/* ..ads */}
            <div className="mt-2 flex w-full h-full bg-main-bg-75">
                <CommercialComponent />
            </div>
        </div>
    );
};

export default HomePage;
