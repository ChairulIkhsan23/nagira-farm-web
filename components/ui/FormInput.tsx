// components/ui/FormInput.tsx
'use client';

import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
}

export default function FormInput({ label, required, ...props }: FormInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
        </div>
    );
}