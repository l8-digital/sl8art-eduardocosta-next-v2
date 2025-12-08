import React from 'react';

interface SelectProps {
  modelValue: string;
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
  error?: string;
  multiple?: boolean;
  loading?: boolean;
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
  loading = false,
  onUpdateModelValue,
  onValidate,
  onChange,
}) => {
  return (
    <div className="pb-3 relative">
      <label htmlFor={name} className="block text-white text-xs uppercase font-semibold z-10 mb-1">
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
        className={`block px-3 py-3.5 min-h-[50px] bg-transparent text-base leading-none w-full text-white border ${error ? 'border-red' : 'border-white-dark'} rounded focus:outline-none focus:ring-0`}
      >
        <option value="" disabled>
          {loading ? 'Carregando...' : 'Selecione...'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default Select;
