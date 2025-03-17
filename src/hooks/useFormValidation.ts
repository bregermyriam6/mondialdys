import { useState } from 'react';

type ValidationRule = (value: string) => string;

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormData {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

export function useFormValidation({
  initialValues,
  validationRules
}: {
  initialValues: FormData;
  validationRules: ValidationRules;
}) {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormData>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const validateField = (name: string, value: string): string => {
    if (validationRules[name]) {
      return validationRules[name](value);
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: FormData = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    // Mark all fields as touched when submitting
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as TouchedFields);
    setTouched(allTouched);

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  return {
    formData,
    errors,
    touched,
    setTouched,
    handleChange,
    validateForm
  };
}