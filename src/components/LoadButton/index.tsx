'use client';

import { useCommon } from '@/contexts/CommonProvider';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './LoadButton.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

const LoadButton = ({
  label,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) => {
  const { startLoader } = useCommon();

  return (
    <button
      type={type}
      onClick={startLoader}
      disabled={disabled}
      className={cx('button', className)}
    >
      {label}
    </button>
  );
};

export default LoadButton;
