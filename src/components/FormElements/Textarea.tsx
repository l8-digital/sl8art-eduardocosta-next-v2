'use client';

import { useEffect, useRef } from 'react';
// import Error from '@/components/FormElements/Error';

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
    <div className={`relative pb-3 ${error ? 'form-control has-error' : 'form-control'}`}>
      <label htmlFor={name} className="block text-white text-xs uppercase font-semibold z-10 mb-1">
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
        className={`block px-3 py-3 text-base leading-none w-full text-white border border-gray rounded-2xl focus:outline-none focus:ring-0 focus:border-blue bg-transparent ${
          error ? 'border-red' : 'border-white-dark'
        }`}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default Textarea;
