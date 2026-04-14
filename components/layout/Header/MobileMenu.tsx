'use client';

import { useEffect } from 'react';
import NavItem from './NavItem';
import { MobileMenuProps } from '@/types';

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="md:hidden bg-green-800 border-t border-green-700/50">
            <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                    <NavItem
                        key={item.name}
                        name={item.name}
                        href={item.href}
                        variant="mobile"
                        onClick={onClose}
                    />
                ))}
            </div>
        </div>
    );
}