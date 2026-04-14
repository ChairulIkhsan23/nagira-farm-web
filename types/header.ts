// components/layout/Header/types.ts
export interface NavItem {
    name: string;
    href: string;
}

export interface HeaderTopProps {
    phone?: string;
    email?: string;
    hours?: string;
    showSocial?: boolean;
}

export interface NavbarProps {
    navItems?: NavItem[];
    logoSrc?: string;
    logoAlt?: string;
}

export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
}