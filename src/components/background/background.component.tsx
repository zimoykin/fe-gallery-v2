import React from 'react';
import './background-style.css';

const BackgroundWithImage: React.FC = () => {
  return (
    <>
      <div className="w-full z-0 bg-img-container">
        <div className="global-background-layer">
          <div className="bg-vignette">
            
          </div>
          <div className="bg-layer-container">
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
          </div>
        </div>
      </div>
    </>
  );
};
export default BackgroundWithImage;
