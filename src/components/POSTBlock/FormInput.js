import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';

export function FormInput({
  label,
  error,
  helperText,
  name,
  value,
  onChange,
  type = 'text',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const showFloatingLabel = isFocused || value;

  return (
    <div className="relative mb-[46px]">
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={classNames(
            'peer w-full px-4 py-4',
            'text-base text-black',
            'border rounded-[4px]',
            'outline-none',
            'transition-all duration-200',
            'placeholder-transparent',
            'bg-transparent',
            error ? 'border-red-500 bg-red-100' : isFocused ? 'border-[#7E7E7E]' : 'border-[#D0CFCF]'
          )}
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <label
          htmlFor={name}
          className={classNames(
            'absolute left-4 px-1',
            'transition-all duration-200',
            'pointer-events-none bg-[#F8F8F8]',
            showFloatingLabel
              ? '-top-2 text-xs'
              : 'top-1/2 -translate-y-1/2 text-base',
            error
              ? 'text-red-500'
              : isFocused
              ? 'text-[#7E7E7E]'
              : 'text-[#7E7E7E]'
          )}
        >
          {label}
        </label>
      </div>
      {helperText && !error && (
        <span className="text-xs text-[#7E7E7E] mt-1 ml-4 absolute left-0">
          {helperText}
        </span>
      )}
      {error && (
        <span className="text-xs text-red-500 mt-1 ml-4 absolute left-0">
          {error}
        </span>
      )}
    </div>
  );
}
