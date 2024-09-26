import React from 'react';

const MenuBtnsComponent: React.FC = () => {

    return (
        <>
            <div>
                <span className='active:bg-primary-bg
        active:text-primary-cl 
        cursor-pointer 
        hover:text-main-col 
        hover:bg-secondary-bg
        uppercase text-sm'>
                    Home</span>
            </div>
            <div>
                <span className='active:bg-primary-bg
        active:text-primary-cl 
        cursor-pointer 
        hover:text-main-col 
        hover:bg-secondary-bg
        uppercase text-sm'>Notification</span>
            </div>
            <div>
                <span className='active:bg-primary-bg
        active:text-primary-cl 
        cursor-pointer 
        hover:text-main-col 
        hover:bg-secondary-bg
        uppercase text-sm'>Profile</span>
            </div>
            <div>
                <span className='active:bg-primary-bg
        active:text-primary-cl 
        cursor-pointer 
        hover:text-main-col 
        hover:bg-secondary-bg
        uppercase text-sm'>Gallery</span>
            </div>
        </>
    );
};

export default MenuBtnsComponent;