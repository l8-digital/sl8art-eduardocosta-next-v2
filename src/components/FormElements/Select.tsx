import React from 'react';

interface SelectProps {
  modelValue: string;
  name: string;
  label: string;
  options: string[];
  error?: string;
  multiple?: boolean;
  onUpdateModelValue: (value: string) => void;
  onValidate: () => void;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  modelValue,
  name,
  label,
  options,
  error,
  multiple,
  onUpdateModelValue,
  onValidate,
  onChange,
}) => {
  return (
    <div className="w-full relative py-3">
      <label htmlFor={name} className="px-2 block text-white text-[13px] font-medium absolute top-[3px] left-2 z-1 bg-black">
        {label}
      </label>
      <select
        id={name}
        name={name}
        multiple={multiple}
        value={modelValue}
        onChange={(e) => {
          const value = e.target.value;
          onUpdateModelValue(value);
          if (onChange) onChange(value);
        }}
        onBlur={onValidate}
        className={`block w-full px-3 pt-3 pb-2.5 text-base border bg-black text-white rounded-lg focus:outline-none focus:ring-0 focus:border-blue appearance-none ${error ? 'border-red' : 'border-white-dark'}  focus:ring-0`}
      >
        <option value="" disabled>
          Selecione...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default Select;
