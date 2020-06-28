import React, { FC, useEffect, useState } from 'react';
import Download from '../../../assets/icons/download.svg';
import Icon from '../../../components/Icon';
import Info from '../../../assets/icons/info.svg';
import Trash from '../../../assets/icons/trash.svg';
import X from '../../../assets/icons/x.svg';
import keyInteraction from '../../../helpers/keyInteraction';
import styles from '../Photos.scss';

export interface PreviewProps {
  close: () => void;
  height: number;
  placeholderUrl: string;
  url: string;
  width: number;
}

const Preview: FC<PreviewProps> = ({
  close,
  height: imageHeight,
  placeholderUrl,
  url,
  width: imageWidth,
}) => {
  useEffect(() => {
    const event = keyInteraction({
      escape: close,
    });
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', event);

    return () => {
      document.body.style.overflow = null;
      window.removeEventListener('keydown', event);
    };
  }, [close]);

  function closeModal(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) {
      close();
    }
  }

  const [width, setWidth] = useState(imageWidth);
  const [height, setHeight] = useState(imageHeight);
  const [imageLoaded, setImageLoaded] = useState(false);
  function calculateDimensions(): void {
    const { innerHeight, innerWidth } = window;
    if (innerHeight > imageHeight && innerWidth > imageWidth) {
      setHeight(imageHeight);
      setWidth(imageWidth);
      return;
    }

    const scale = Math.min(innerHeight / imageHeight, innerWidth / imageWidth);
    setHeight(imageHeight * scale);
    setWidth(imageWidth * scale);
  }
  useEffect(calculateDimensions, [imageWidth, imageHeight]);
  useEffect(() => {
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  });

  return (
    <div className={styles.preview} onClickCapture={closeModal}>
      <div className={styles.header}>
        <Icon className={styles.icon} label="Close" onClick={close}>
          <X />
        </Icon>
        <Icon className={styles.icon} label="Delete photo">
          <Trash />
        </Icon>
        <Icon className={styles.icon} label="Download photo">
          <Download />
        </Icon>
        <Icon className={styles.icon} label="View info">
          <Info />
        </Icon>
      </div>

      <img
        alt="alt"
        className={styles.placeholder}
        src={placeholderUrl}
        style={{
          height: `${height}px`,
          opacity: imageLoaded ? 0 : 1,
          width: `${width}px`,
        }}
      />
      <img
        alt="alt"
        className={styles.image}
        onLoad={() => setImageLoaded(true)}
        src={url}
      />
    </div>
  );
};

export default Preview;
