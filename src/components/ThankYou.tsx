import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface ThankYouProps {
  onBackToHome: () => void;
}

export default function ThankYou({ onBackToHome }: ThankYouProps) {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-bounce-slow mb-8 flex justify-center">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
          Thank You!
        </h1>
        
        <div className="space-y-4 mb-12 animate-slide-up">
          <p className="text-xl text-gray-600">
            We've received your message and appreciate you taking the time to reach out.
          </p>
          <p className="text-xl text-gray-600">
            Our team will review your details and get back to you shortly.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="group relative overflow-hidden px-8 py-3 bg-black text-white rounded-lg
            transform transition-all duration-300
            hover:scale-105 hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
            animate-fade-slide-up"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black 
            transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
} 