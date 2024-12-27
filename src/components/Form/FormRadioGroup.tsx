import React from 'react';

interface FormRadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function FormRadioGroup({ options, value, onChange, error }: FormRadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center transform transition-all duration-200 hover:translate-x-1">
          <input
            type="radio"
            id={option}
            name="gender"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${error ? 'border-red-300' : ''}`}
          />
          <label htmlFor={option} className="ml-2 text-sm text-gray-700">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}