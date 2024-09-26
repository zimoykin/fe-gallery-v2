import React from 'react';
import './camera-spinner-style.css';

interface Props {
  size?: 'mini' | 'small' | 'medium' | 'large';
}

const CameraSpinner: React.FC<Props> = ({ size = 'mini' }) => {

  const SizesMap = {
    mini: '10',
    small: '20',
    medium: '28',
    large: '44'
  } as const;

  return (
    <div className="flex justify-center items-center">
      <div className="spinner">
        <div className={`min-h-${SizesMap[size]}  min-w-${SizesMap[size]}`}>
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
