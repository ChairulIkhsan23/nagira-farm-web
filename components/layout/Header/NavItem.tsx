'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
    name: string;
    href: string;
    variant?: 'desktop' | 'mobile';
    onClick?: () => void;
}

export default function NavItem({ name, href, variant = 'desktop', onClick }: NavItemProps) {
    const pathname = usePathname();

    const isActive = () => {
        if (href === '/') return pathname === href;
        return pathname.startsWith(href);
    };

    const active = isActive();

    if (variant === 'mobile') {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={`block py-3 px-3 rounded-lg text-base transition-all duration-200 
                    ${active
                        ? 'text-white font-medium border-l-6 border-green-500 bg-green-700/30'
                        : 'text-green-200 hover:bg-green-700/50 hover:text-white hover:pl-5'
                    }
                `}
            >
                {name}
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 group
            ${active
                    ? 'text-white'
                    : 'text-green-200 hover:text-white'
                }
        `}
        >
            <span className="relative inline-block">
                {name}

                {/* underline */}
                <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-green-500 transition-all duration-300
                ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
                />
            </span>
        </Link>
    );
}