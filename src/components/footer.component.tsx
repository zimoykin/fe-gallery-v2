import React from 'react';

const FooterComponent: React.FC = () => {

    return (
        <footer className='flex absolute bottom-0 left-1/2 -translate-x-1/2 justify-center'>
            <a className='p-1 cursor hover:bg-secondary-bg' href='https://github.com/zimoykin'>
                🧑‍💻 | D.Zimoikin
            </a>
        </footer>
    );
};

export default FooterComponent;