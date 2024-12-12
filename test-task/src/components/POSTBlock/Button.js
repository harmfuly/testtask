import React from 'react';
import { classNames } from '../../utils/classNames';

export function Button({ children, disabled, className, ...props }) {
  return (
    <button
      className={classNames(
        'w-[100px] h-[34px]',
        'rounded-[80px]',
        'font-medium',
        'transition-colors',
        disabled 
          ? 'bg-[#B4B4B4] text-white cursor-not-allowed'
          : 'bg-[#FFE302] text-black hover:bg-[#FFE302]/90',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}