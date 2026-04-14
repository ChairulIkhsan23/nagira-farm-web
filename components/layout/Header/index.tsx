'use client';

import { useState, useEffect } from 'react';
import HeaderTop from './HeaderTop';
import Navbar from './Navbar';
import { NavItem } from '@/types';

interface HeaderProps {
    showTopBar?: boolean;
    navItems?: NavItem[];
    phone?: string;
    email?: string;
    hours?: string;
}

export default function Header({
    showTopBar = true,
    navItems,
    phone,
    email,
    hours
}: HeaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            {/* Entire Header */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            `}>
                {showTopBar && (
                    <HeaderTop
                        phone={phone}
                        email={email}
                        hours={hours}
                    />
                )}
                <Navbar navItems={navItems} />
            </div>
        </>
    );
}