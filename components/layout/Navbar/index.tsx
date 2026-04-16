'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Produk', href: '/ternak' },
    { name: 'Berita', href: '/artikel' },
    { name: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <nav className="bg-green-800 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
                        <div className="relative w-10 h-10 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo/logo.svg"
                                alt="Nagira Farm"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out
                                        ${active
                                            ? 'text-white'
                                            : 'text-green-200 hover:text-white hover:bg-green-700/30'
                                        }
                                    `}
                                >
                                    {item.name}

                                    {/* Active Underline */}
                                    {active && (
                                        <span className="absolute -bottom-0.5 left-2/4 transform -translate-x-1/2 w-10 h-0.5 bg-linear-to-r from-green-500 to-green-500 rounded-full"></span>)}

                                    {/* Hover Underline Effect (only for non-active) */}
                                    {!active && (
                                        <span className="absolute -bottom-0.5 left-2/4 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-green-500 to-green-500 rounded-full transition-all duration-300 ease-out group-hover:w-6"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-green-700/50 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-green-800 border-t border-green-700/50 transition-all duration-300 ease-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-4 py-4 space-y-1">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={`block py-3 px-3 rounded-lg text-base transition-all duration-200 
                                    ${active
                                        ? 'text-white font-medium border-l-8 border-green-400 bg-green-700/30'
                                        : 'text-green-200 hover:bg-green-700/50 hover:text-white hover:pl-4'
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}