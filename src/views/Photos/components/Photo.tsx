import React, { FC, useEffect, useRef, useState } from 'react';
import { Thumbnail } from 'app';
import keyInteraction from '../../../helpers/keyInteraction';
import styles from '../Photos.scss';

export interface PhotoProps {
  color: string;
  height: number;
  onClick?: () => void;
  thumbnails: Thumbnail[];
  width: number;
}

const Photo: FC<PhotoProps> = ({
  color,
  height,
  thumbnails,
  onClick,
  width,
}) => {
  const [stage, setStage] = useState(0);
  function updateStage(newState: number): void {
    setStage((s) => (newState > s ? newState : s));
  }

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
      onClick={onClick}
      onKeyDown={keyInteraction({ enter: onClick, space: onClick })}
      ref={ref}
      role="button"
      style={{
        backgroundColor: stage < 2 ? `#${color}` : 'transparent',
        gridRow: `span ${Math.floor(renderedHeight + 8)}`,
      }}
      tabIndex={0}
    >
      {stage < 3 && (
        <img
          alt="test"
          onLoad={() => updateStage(1)}
          src={thumbnails.find((t) => t.type === 'BLUR').url}
          style={{ opacity: stage > 0 ? 1 : 0 }}
        />
      )}
      {stage > 0 && (
        <img
          alt="test"
          onLoad={() => updateStage(2)}
          onTransitionEnd={() => updateStage(3)}
          src={thumbnails.find((t) => t.type === 'NORMAL').url}
          style={{ opacity: stage >= 2 ? 1 : 0 }}
        />
      )}
    </div>
  );
};

export default Photo;
