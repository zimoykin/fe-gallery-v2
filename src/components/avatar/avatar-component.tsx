import React from 'react';
import './avatar-style.css';

interface Props {
  canShowImage?: (res: boolean) => void;
  onClick?: () => void;
  url?: string;
  size?: 'auto' | 'mini' | 'small' | 'medium' | 'large';
}

const SizesMap = {
  mini: '4rem',
  small: '5rem',
  medium: '10rem',
  large: '12rem',
  auto: 'auto'
};

const Avatar: React.FC<Props> = ({ onClick, url, size = 'auto' }: Props) => {
  return (
    <div className="avatar-container-person">
      <div
        onClick={onClick}
        className="avatar-container-person-img shadow-2xl hover:scale-105"
        style={
          size === 'auto'
            ? {
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            : {
                width: SizesMap[size || 'medium'],
                height: SizesMap[size || 'medium'],
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
        }
      />
      <div />
    </div>
  );
};

export default Avatar;
