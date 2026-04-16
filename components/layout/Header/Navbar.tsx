'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavItem from './NavItem';
import MobileMenu from './MobileMenu';
import { NavbarProps, NavItem as NavItemType } from '@/types';

const defaultNavItems: NavItemType[] = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Produk', href: '/ternak' },
    { name: 'Berita', href: '/artikel' },
    { name: 'Kontak', href: '/kontak' },
];

export default function Navbar({
    navItems = defaultNavItems,
    logoSrc = '/logo/logo.svg',
    logoAlt = 'Nagira Farm'
}: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-green-800 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
                        <div className="relative w-10 h-10 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.name}
                                name={item.name}
                                href={item.href}
                                variant="desktop"
                            />
                        ))}
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
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={handleLinkClick}
                navItems={navItems}
            />
        </nav>
    );
}