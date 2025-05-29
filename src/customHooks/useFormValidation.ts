import { useState, useEffect } from 'react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const useFormValidation = (values: FormValues) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const { name: name, email, message } = values;

    const isValid =
      name.trim() !== '' &&
      email.trim() !== '' &&
      message.trim() !== '' &&
      email.includes('@') &&
      !email.includes('\n');

    setIsSubmitEnabled(isValid);
  }, [values]);

  return isSubmitEnabled;
};

export default useFormValidation;
