import React from 'react';
import { classNames } from '../../utils/classNames';

export function FileUpload({ name, value, onChange, error }) {
  return (
    <div className="mt-[47px] mb-[50px] flex flex-col items-start w-full">
      <div className={classNames(
        'flex items-center w-full',
        'border rounded-[4px]',
        error ? 'border-red-500' : 'border-[#D0CFCF]'
      )}>
        <label 
          htmlFor={name}
          className={classNames(
            'px-4 py-3',
            'border-r border-[#D0CFCF]',
            'cursor-pointer hover:bg-gray-50',
            'w-1/4'
          )}
        >
          Upload
          <input
            id={name}
            name={name}
            type="file"
            className="hidden"
            onChange={onChange}
            accept="image/jpeg"
          />
        </label>
        <span className="px-4 text-[#7E7E7E] w-full text-ellipsis overflow-hidden">
          {value?.name || 'Upload your photo'}
        </span>
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-1 ml-4">
          {error}
        </span>
      )}
    </div>
  );
}