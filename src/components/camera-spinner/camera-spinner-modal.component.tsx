import React from 'react';
import CameraSpinner from './camera-spinner.component';
import './camera-spinner-style.css';

const CameraSpinnerModal: React.FC = () => {
  return (
    <div className="
    fixed w-full h-full
     top-0 left-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <CameraSpinner size='large' />
    </div>
  );
};

export default CameraSpinnerModal;
