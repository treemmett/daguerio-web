import React, { FC, useEffect } from 'react';
import keyInteraction from '../../../helpers/keyInteraction';
import styles from '../Photos.scss';

export interface PreviewProps {
  close: () => void;
  url: string;
}

const Preview: FC<PreviewProps> = ({ close, url }) => {
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

  return (
    <div className={styles.preview} onClickCapture={closeModal}>
      <img alt="alt" src={url} />
    </div>
  );
};

export default Preview;
