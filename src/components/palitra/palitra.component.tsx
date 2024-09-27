import React from 'react';
import './palitra.style.css';

interface Props {
  size?: 'mini' | 'small' | 'medium' | 'large';
}

const PalitraComponent: React.FC<Props> = ({ size = 'mini' }) => {

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className={`palitra-col ${size} palitra-1 flex justify-center ites-center`} />
        <div className={`palitra-col ${size} palitra-2 flex justify-center items-center`} />
        <div className={`palitra-col ${size} palitra-3 flex justify-center items-center`} />
        <div className={`palitra-col ${size} palitra-4 flex justify-center items-center`} />
        <div className={`palitra-col ${size} palitra-5 flex justify-center items-center`} />
        <div className={`palitra-col ${size} palitra-6 flex justify-center items-center`} />
      </ div>
    </>
  );
};

export default PalitraComponent;
