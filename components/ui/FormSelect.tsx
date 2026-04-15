// components/ui/FormSelect.tsx
'use client';

import { SelectHTMLAttributes } from 'react';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    required?: boolean;
}

export default function FormSelect({ label, options, required, ...props }: FormSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <select
                {...props}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}