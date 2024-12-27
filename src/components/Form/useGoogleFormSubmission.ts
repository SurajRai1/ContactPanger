import { useState } from 'react';
import { FormData } from './types';
import { FORM_URL, ENTRY_IDS } from './constants';

export const useGoogleFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitToGoogleForm = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Create FormData object for submission
      const formDataToSend = new URLSearchParams();
      
      // Add form fields with their corresponding entry IDs
      Object.entries(ENTRY_IDS).forEach(([key, entryId]) => {
        const value = formData[key as keyof FormData];
        formDataToSend.append(entryId, value);
        console.log(`Adding parameter: ${entryId} = ${value}`); // Debug log
      });

      const submitUrl = `${FORM_URL}?${formDataToSend.toString()}`;
      console.log('Submitting to URL:', submitUrl); // Debug log

      // Make the submission
      const response = await fetch(submitUrl, {
        method: 'POST',
        mode: 'no-cors', // This is required for Google Forms
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Form submitted successfully'); // Debug log
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitToGoogleForm, isSubmitting };
};