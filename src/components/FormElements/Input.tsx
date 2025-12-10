'use client';

import { useEffect, useRef } from 'react';
import Error from '@/components/FormElements/Error';



interface InputProps {
  modelValue: string;
  name: string;
  type: string;
  error?: string;
  label: string;
  min?: string;
  max?: string;
  maxlength?: number;
  placeholder?: string;
  disabled?: boolean;
  autofocus?: boolean;
  loading?: boolean;
  autocomplete?: string;
  required?: boolean;
  onUpdateModelValue: (value: string) => void;
  onValidate: () => void;
}

const Input = ({
  modelValue,
  name,
  type,
  error,
  label,
  min,
  max,
  maxlength,
  placeholder,
  disabled,
  autofocus,
  loading,
  autocomplete,
  required,
  onUpdateModelValue,
  onValidate
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateModelValue(e.target.value);
  };

  return (
    <div className={`w-full relative py-3 ${error ? 'form-control has-error' : 'form-control'}`}>
      <label htmlFor={name} className=" block text-white text-[13px] font-medium absolute top-[3px] left-4 md:-left-2 z-10 bg-black">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        autoFocus={autofocus}
        maxLength={maxlength}
        disabled={disabled}
        autoComplete={autocomplete}
        required={required}
        placeholder={placeholder}
        value={modelValue}
        ref={inputRef}
        onBlur={onValidate}
        onFocus={() => {}}
        onInput={handleInputChange}
        className={`block w-full px-4 pt-3 relative md:-left-11 pb-2 text-base border bg-black text-white rounded-full focus:outline-none focus:ring-0 focus:border-blue ${error ? 'border-red' : 'border-white-dark'}`}
      />
      {loading && (
        <div className="block w-6 h-6 border-2 rounded-full border-t-white border-gray-light animate-spin loading-icon"></div>
      )}
      {error && <Error message={error} />}
    </div>
  );

};



export default Input;
