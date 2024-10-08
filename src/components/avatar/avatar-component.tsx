import React from 'react';

interface Props {
  canShowImage?: (res: boolean) => void;
  onClick?: () => void;
  url?: string;
  size?: keyof typeof SizesMap;
}

const SizesMap = {
  micro: '2rem',
  mini: '4rem',
  small: '5rem',
  medium: '10rem',
  large: '12rem',
  auto: 'auto'
};

const Avatar: React.FC<Props> = ({ onClick, url, size = 'auto' }: Props) => {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-no-repeat bg-cover bg-position:center 
        aspect-square
        bg-slate-400
        transition-all duration-100 ease-in-out delay-75
        rounded-full cursor-pointer shadow-2xl hover:scale-105"
        style={
          size === 'auto'
            ? {
              backgroundImage: `url(${url})`,
            }
            : {
              width: SizesMap[size || 'medium'],
              height: SizesMap[size || 'medium'],
              backgroundImage: `url(${url})`,
            }
        }
      />
      <div />
    </>
  );
};

export default Avatar;
