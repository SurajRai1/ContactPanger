import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: boolean;
}

export function FormSelect({ options, error, className = '', ...props }: FormSelectProps) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2 border transition-all duration-200 
        ${error ? 'border-red-300' : 'border-gray-300'} 
        rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
        hover:border-blue-400 ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}