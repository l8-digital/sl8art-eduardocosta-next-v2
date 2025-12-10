'use client';

import { useEffect, useRef } from 'react';
import Error from '@/components/FormElements/Error';

interface TextareaProps {
  modelValue: string;
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
  maxlength?: number;
  error?: string;
  required?: boolean;
  onUpdateModelValue: (value: string) => void;
  onValidate: () => void;
}

const Textarea: React.FC<TextareaProps> = ({
  modelValue,
  name,
  label,
  rows = 4,
  placeholder,
  maxlength,
  error,
  required,
  onUpdateModelValue,
  onValidate,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current?.hasAttribute('autofocus')) {
      textareaRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateModelValue(e.target.value);
  };

  return (
    <div className={`relative py-3 ${error ? 'form-control has-error' : 'form-control'}`}>
      <label htmlFor={name} className="px-2 block text-white text-sm font-medium absolute top-[3px] left-2 z-1 bg-black">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxlength}
        required={required}
        value={modelValue}
        onChange={handleInputChange}
        onBlur={onValidate}
        onFocus={() => {}}
        ref={textareaRef}
        className={`block px-3 py-3 text-base leading-none w-full text-white border border-gray rounded-lg focus:outline-none focus:ring-0 focus:border-blue bg-transparent ${
          error ? 'border-red' : 'border-white-dark'
        }`}
      />
      {error && <Error message={error} />}
    </div>
  );
};

export default Textarea;
