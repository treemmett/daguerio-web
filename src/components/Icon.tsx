import React, { FC } from 'react';
import cx from 'classnames';
import keyInteraction from '../helpers/keyInteraction';
import styles from './Icon.scss';

export interface IconProps {
  className?: string;
  onClick?: () => void;
  label: string;
}

const Icon: FC<IconProps> = ({ children, className, label, onClick }) => {
  return (
    <div
      aria-label={label}
      className={cx(className, styles.icon)}
      onClick={onClick}
      onKeyDown={keyInteraction({ enter: onClick, space: onClick })}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default Icon;
