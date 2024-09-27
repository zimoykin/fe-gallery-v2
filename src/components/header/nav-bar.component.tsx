import React, { useState } from 'react';
import MenuBtnsComponent from './menu-btns.component';

const NavBarComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className='p-1 w-full flex flex-row max-w-screen-2xl bg-main-bg gap-3
        '>
            {/* mobile view */}
            <div className='w-full block justify-start gap-2 md:hidden
               '
            >
                <button
                    className="text-white block md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-7 h-7 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                {isOpen &&
                    <div>
                        <div className={`transition-opacity duration-1000
                        absolute z-10 right-0 top-0 h-screen w-screen bg-secondary-bg-75
                         ${isOpen ? 'bg-opacity-80' : 'bg-opacity-0'}`}
                            onClick={toggleMenu}
                        />
                        <div className='
    transition-opacity duration-1000
                        absolute z-20 left-0 top-0 h-screen w-1/3 bg-main-bg'>
                            <div className='p-3'>
                                <MenuBtnsComponent
                                    onClick={toggleMenu}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* desktop view */}
            <div className="hidden md:flex space-x-4 transition-all ease-in-out delay-75 duration-300">
                <MenuBtnsComponent onClick={toggleMenu} />
            </div>
        </nav>
    );

};

export default NavBarComponent;