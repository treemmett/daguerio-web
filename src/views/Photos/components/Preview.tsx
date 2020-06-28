import React, { FC, useEffect } from 'react';
import Download from '../../../assets/icons/download.svg';
import Icon from '../../../components/Icon';
import Info from '../../../assets/icons/info.svg';
import Trash from '../../../assets/icons/trash.svg';
import X from '../../../assets/icons/x.svg';
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
      <img alt="alt" src={url} />
    </div>
  );
};

export default Preview;
