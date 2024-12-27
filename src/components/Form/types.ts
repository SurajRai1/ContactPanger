export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  dateOfBirth: string;
  gender: string;
  feedback: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type SubmitStatus = 'idle' | 'success' | 'error';