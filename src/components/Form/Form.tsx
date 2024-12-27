import React, { useState } from 'react';
import { Upload, Calendar, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { FormField } from './FormField';
import { FormInput } from './FormInput';
import { FormTextArea } from './FormTextArea';
import { FormSelect } from './FormSelect';
import { FormRadioGroup } from './FormRadioGroup';
import { FormData, SubmitStatus } from './types';
import { OCCUPATIONS } from './constants';
import { useFormValidation } from './useFormValidation';
import { useGoogleFormSubmission } from './useGoogleFormSubmission';

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  occupation: 'Student',
  dateOfBirth: '',
  gender: '',
  feedback: ''
};

export default function Form() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [file, setFile] = useState<File | null>(null);

  const { validateForm } = useFormValidation();
  const { submitToGoogleForm, isSubmitting } = useGoogleFormSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('error');
      return;
    }

    const success = await submitToGoogleForm(formData, file);
    
    if (success) {
      setSubmitStatus('success');
      setFormData(initialFormData);
      setFile(null);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Contact Form</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField label="Full Name" icon={User} error={errors.fullName}>
            <FormInput
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="John Doe"
              error={!!errors.fullName}
            />
          </FormField>

          {/* Add other form fields similarly */}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md 
              transition-all duration-200 transform hover:bg-blue-700 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isSubmitting ? 'animate-pulse' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 text-green-700 rounded-md animate-fadeIn">
              Form submitted successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md animate-fadeIn">
              Please fix the errors and try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}