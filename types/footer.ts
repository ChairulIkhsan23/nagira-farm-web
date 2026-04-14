import { ContactInfo } from './contact';
import { SocialMedia } from './social';

export interface FooterLink {
    title: string;
    url: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    companyName?: string;
    tagline?: string;
    contactInfo?: ContactInfo;
    sections?: FooterSection[];
    socialMedia?: SocialMedia[];
    copyrightText?: string;
    year?: number;
    className?: string;
}