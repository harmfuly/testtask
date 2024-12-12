import React from 'react';

export function RadioGroup({ label, name, options, value, onChange, error }) {
  return (
    <div className="mt-[43px] flex flex-col items-start">
      <p className="text-base mb-3">{label}</p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label key={option.id} className="flex items-center gap-5 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.name}
              checked={value === option.name}
              onChange={onChange}
              className="w-5 h-5 text-[#00BDD3] border-[#D0CFCF]
                focus:ring-[#00BDD3] focus:ring-offset-0"
            />
            <span className="text-base">{option.name}</span>
          </label>
        ))}
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-1 ml-4">
          {error}
        </span>
      )}
    </div>
  );
}