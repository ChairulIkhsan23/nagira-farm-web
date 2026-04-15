// components/ui/InfoCard.tsx
'use client';

import { ReactNode } from 'react';

interface InfoCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
    href?: string;
}

export default function InfoCard({ icon, title, children, href }: InfoCardProps) {
    return (
        <div className="flex gap-3 group">
            <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                {href ? (
                    <a href={href} className="text-green-600 text-xs mt-0.5 block">
                        {children}
                    </a>
                ) : (
                    <div className="text-gray-500 text-xs mt-0.5">{children}</div>
                )}
            </div>
        </div>
    );
}