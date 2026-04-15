// components/ui/SubmitButton.tsx
'use client';

interface SubmitButtonProps {
    isSubmitting: boolean;
    text: string;
    submittingText: string;
}

export default function SubmitButton({ isSubmitting, text, submittingText }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className={`
                w-full py-3.5 px-4 
                bg-yellow-400
                text-white font-semibold rounded-xl 
                transition-all duration-300 
                flex items-center justify-center gap-2 
                shadow-xs hover:shadow-md
                focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                disabled:opacity-70 disabled:cursor-not-allowed
                ${!isSubmitting && 'hover:bg-yellow-500'}
            `}
        >
            {isSubmitting ? (
                <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{submittingText}</span>
                </>
            ) : (
                <>
                    <span>{text}</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </>
            )}
        </button>
    );
}