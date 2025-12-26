"use client";

import { useEffect, useRef, useState } from "react";
import { formatCurrency2 } from "./helpers/formatCurrency2";
import { formatPercentage } from "./helpers/formatPercentage";
import { formatDocInput } from "./helpers/formatDocInput";
import { formatCpfCnpjInput } from "./helpers/formatCpfCnpjInput";
import { formatCpf } from "./helpers/formatCpf";
import { formatPhone } from "./helpers/formatPhone";
import { formatCep } from "./helpers/formatCep";
import { formatCreditCard } from "./helpers/formatCreditCard";
import { formatExpiry } from "./helpers/formatExpiry";
import { formatInteger } from "./helpers/formatInteger";
import { formatSlug } from "./helpers/formatSlug";

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
    maskType?:
        | "currency"
        | "document"
        | "phone"
        | "percentage"
        | "integer"
        | "cep"
        | "cpf"
        | "creditcard"
        | "expiry"
        | "slug"
        | "cpf_cnpj"
        | "coupon";
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
    onValidate,
    maskType,
}: InputProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [valueLocal, setValueLocal] = useState<string>("");

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    useEffect(() => {
        setValueLocal(applyMask(modelValue));
    }, [modelValue]);

    const applyMask = (value: string) => {
        if (!maskType) return value;

        switch (maskType) {
            case "currency":
                return formatCurrency2(value)?.masked;
            case "percentage":
                return formatPercentage(value)?.masked;
            case "document":
                return formatDocInput(value, true);
            case "cpf_cnpj":
                return formatCpfCnpjInput(value);
            case "cpf":
                return formatCpf(value);
            case "phone":
                return formatPhone(value);
            case "cep":
                return formatCep(value);
            case "creditcard":
                return formatCreditCard(value);
            case "expiry":
                return formatExpiry(value);
            case "integer":
                return formatInteger(value)?.masked;
            case "slug":
                return formatSlug(value);
            case "coupon":
                return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
            default:
                return value;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        let masked = raw;
        let output = raw;

        switch (maskType) {
            case "currency": {
                const f = formatCurrency2(raw);
                masked = f.masked;
                output = String(f.value);
                break;
            }
            case "percentage": {
                const f = formatPercentage(raw);
                masked = f.masked;
                output = String(f.value);
                break;
            }
            case "integer": {
                const f = formatInteger(raw);
                masked = f.masked;
                output = String(f.value);
                break;
            }
            case "phone":
                masked = formatPhone(raw);
                output = masked;
                break;

            case "cpf":
                output = raw.replace(/\D/g, "").slice(0, 11);
                masked = formatCpf(output);
                break;

            case "cpf_cnpj":
                output = raw.replace(/\D/g, "").slice(0, 14);
                masked = formatCpfCnpjInput(output);
                break;

            case "cep":
                output = raw.replace(/\D/g, "").slice(0, 8);
                masked = formatCep(output);
                break;

            case "creditcard":
                output = raw.replace(/\D/g, "").slice(0, 16);
                masked = formatCreditCard(output);
                break;

            case "expiry":
                masked = formatExpiry(raw);
                output = masked;
                break;

            case "slug":
                masked = formatSlug(raw);
                output = masked;
                break;

            case "coupon":
                masked = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
                output = masked;
                break;
        }

        setValueLocal(masked);
        onUpdateModelValue(output);
    };

    return (
        <div className={`relative pb-3 ${error ? "form-control has-error" : "form-control"}`}>
            <label htmlFor={name} className="block text-white text-xs uppercase font-semibold mb-1">
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
                value={valueLocal}
                ref={inputRef}
                onBlur={onValidate}
                onChange={handleChange}
                className={`block px-5 py-3  text-base min-h-[50px] w-full text-white border rounded-full bg-black focus:outline-none ${
                    error ? "border-red" : "border-white-dark"
                }`}
            />

            {loading && (
                <div className="block w-6 h-6 border-2 rounded-full border-t-white border-gray-light animate-spin"></div>
            )}

            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
        </div>
    );
};

export default Input;
