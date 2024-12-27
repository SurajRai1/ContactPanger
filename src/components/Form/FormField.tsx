import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, icon: Icon, error, children }: FormFieldProps) {
  return (
    <div className="transform transition-all duration-200 hover:translate-y-[-2px]">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}