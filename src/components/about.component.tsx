import React from "react";
import { version } from '../../package.json';

const AboutComponent: React.FC = () => {
    return (
        <div className='p-5 w-full h-1/3 bg-main-bg shadow-xl rounded-md max-w-normal-screen justify-center flex flex-col'>
            <div className="flex items-center justify-center gap-2">
                <span className='text-main-col'>React+Vite+Tailwind template  ({`ver: ${version}`}) </span>
                <div className='flex justify-end bg-secondary-bg p-2 hover:scale-105'>
                    <span className='p-1'> • </span>
                    <a className='p-1 cursor hover:bg-secondary-bg hover:scale-125' href='https://github.com/zimoykin'>reposicitory</a>
                </div>
            </div>
        </div>
    );

};

export default AboutComponent;