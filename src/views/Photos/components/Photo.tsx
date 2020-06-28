import React, { FC, useEffect, useRef, useState } from 'react';
import styles from '../Photos.scss';

export interface PhotoProps {
  color: string;
  height: number;
  width: number;
  url: string;
}

const Photo: FC<PhotoProps> = ({ color, width, height, url }) => {
  const ref = useRef<HTMLImageElement>();
  const [renderedHeight, setRenderedHeight] = useState<number>(height);

  function updateHeight(): void {
    if (!ref?.current?.offsetWidth) return;

    setRenderedHeight((ref.current.offsetWidth * height) / width);
  }

  useEffect(updateHeight, [ref.current?.offsetWidth, width, height]);
  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  });

  return (
    <div
      className={styles.photo}
      style={{
        backgroundColor: `#${color}`,
        gridRow: `span ${Math.floor(renderedHeight + 16)}`,
      }}
    >
      <img alt="test" ref={ref} src={url} />
    </div>
  );
};

export default Photo;
