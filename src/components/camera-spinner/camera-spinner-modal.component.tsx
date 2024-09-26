import React from 'react';
import CameraSpinner from './camera-spinner.component';
import './camera-spinner-style.css';

const CameraSpinnerModal: React.FC = () => {
  return (
    <div className="spinner-container">
      <CameraSpinner />
    </div>
  );
};

export default CameraSpinnerModal;
