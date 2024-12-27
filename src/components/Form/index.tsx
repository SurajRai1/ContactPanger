import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { useGoogleFormSubmission } from './useGoogleFormSubmission';
import { FormData, FormErrors } from './types';

interface FormProps {
  onSubmitSuccess: () => void;
}

export default function Form({ onSubmitSuccess }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    occupation: 'Student',
    dateOfBirth: '',
    gender: '',
    feedback: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { submitToGoogleForm, isSubmitting } = useGoogleFormSubmission();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    try {
      const success = await submitToGoogleForm(formData);
      
      if (success) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          occupation: 'Student',
          dateOfBirth: '',
          gender: '',
          feedback: ''
        });
        onSubmitSuccess();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 bg-gray-50 border-2 rounded-lg
    transition-all duration-300 ease-in-out
    ${focusedField === fieldName ? 'border-black shadow-lg scale-[1.02]' : 'border-transparent'}
    ${errors[fieldName] ? 'border-red-300' : ''}
    hover:border-gray-300
    focus:outline-none focus:border-black focus:ring-0
    placeholder-gray-400
    transform hover:scale-[1.01]
  `;

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Contact Form
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
            Got a project in mind? We'd love to hear about it. Share your ideas and let's create something amazing together.
            Fill in the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} 
          className="space-y-8 transform transition-all duration-500 hover:scale-[1.01] 
            bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Full Name - Split into First and Last */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                First name
              </label>
              <input
                type="text"
                value={formData.fullName.split(' ')[0] || ''}
                onChange={(e) => {
                  const lastName = formData.fullName.split(' ').slice(1).join(' ');
                  setFormData({...formData, fullName: `${e.target.value} ${lastName}`.trim()});
                }}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('fullName')}
                placeholder="Your first name"
              />
              {errors.fullName && 
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.fullName}
                </p>
              }
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Last name
              </label>
              <input
                type="text"
                value={formData.fullName.split(' ').slice(1).join(' ')}
                onChange={(e) => {
                  const firstName = formData.fullName.split(' ')[0] || '';
                  setFormData({...formData, fullName: `${firstName} ${e.target.value}`.trim()});
                }}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('lastName')}
                placeholder="Your last name"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2 group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Your email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('email')}
                placeholder="Your email address"
              />
              {errors.email && 
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.email}
                </p>
              }
            </div>

            {/* Phone */}
            <div className="md:col-span-2 group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('phone')}
                placeholder="Your phone number"
              />
              {errors.phone && 
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.phone}
                </p>
              }
            </div>

            {/* Address */}
            <div className="md:col-span-2 group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                onFocus={() => setFocusedField('address')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('address')}
                rows={3}
                placeholder="Your address"
              />
            </div>

            {/* Occupation */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Occupation
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                onFocus={() => setFocusedField('occupation')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('occupation')}
              >
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Retired">Retired</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                onFocus={() => setFocusedField('dateOfBirth')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('dateOfBirth')}
              />
              {errors.dateOfBirth && 
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.dateOfBirth}
                </p>
              }
            </div>

            {/* Gender */}
            <div className="md:col-span-2 group">
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-black">
                Gender
              </label>
              <div className="flex flex-wrap gap-6">
                {['Male', 'Female', 'Other'].map((option) => (
                  <div key={option} 
                    className="flex items-center transform transition-all duration-300 hover:scale-105">
                    <input
                      type="radio"
                      id={option}
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 
                        transition-all duration-300 hover:border-black"
                    />
                    <label htmlFor={option} 
                      className="ml-2 text-sm text-gray-700 cursor-pointer 
                        transition-colors hover:text-black">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {errors.gender && 
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.gender}
                </p>
              }
            </div>

            {/* Project Goals / Feedback */}
            <div className="md:col-span-2 group">
              <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-black">
                Tell us more about your project goals
              </label>
              <textarea
                value={formData.feedback}
                onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                onFocus={() => setFocusedField('feedback')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('feedback')}
                rows={4}
                placeholder="e.g. We'd like to rebrand & improve our marketing website and platform."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center md:justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                group relative overflow-hidden px-8 py-3 bg-black text-white rounded-lg
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send 
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black 
                transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg animate-fade-slide-up
              transform hover:scale-[1.02] transition-all duration-300">
              Message sent successfully! We'll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg animate-fade-slide-up
              transform hover:scale-[1.02] transition-all duration-300">
              Please fix the errors and try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 