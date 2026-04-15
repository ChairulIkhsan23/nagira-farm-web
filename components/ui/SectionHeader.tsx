// components/ui/SectionHeader.tsx
'use client';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    alignment?: 'left' | 'center';
}

export default function SectionHeader({ title, subtitle, icon, alignment = 'left' }: SectionHeaderProps) {
    return (
        <div className={`mb-6 ${alignment === 'center' ? 'text-center' : ''}`}>
            <div className={`flex items-center gap-3 ${alignment === 'center' ? 'justify-center' : ''}`}>
                {icon && (
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        {icon}
                    </div>
                )}
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className={`w-25 h-1 bg-green-500 rounded-full mt-2 ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
            {subtitle && (
                <p className="text-gray-500 text-sm mt-3">{subtitle}</p>
            )}
        </div>
    );
}