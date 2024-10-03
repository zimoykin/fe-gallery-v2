import React from 'react';
import './camera-spinner-style.css';

interface Props {
  size?: 'mini' | 'small' | 'medium' | 'large';
}

const CameraSpinner: React.FC<Props> = ({ size = 'mini' }) => {
  return (
    <div className="flex justify-center items-center z-40">
      <div className="spinner">
        <div className={size}>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
        </div>
      </div>
    </div>
  );
};

export default CameraSpinner;
