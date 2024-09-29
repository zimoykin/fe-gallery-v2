import React from 'react';
import './background-style.css';

const BackgroundWithImage: React.FC = () => {
  return (
    <>
      <div className=" fixed w-full z-0 bg-img-container">
        <div className="bg-vignette" />
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
    </>
  );
};
export default BackgroundWithImage;
