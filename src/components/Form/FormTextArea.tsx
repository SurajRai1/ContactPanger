import React from 'react';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function FormTextArea({ error, className = '', ...props }: FormTextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-2 border transition-all duration-200 
        ${error ? 'border-red-300' : 'border-gray-300'} 
        rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
        hover:border-blue-400 ${className}`}
    />
  );
}