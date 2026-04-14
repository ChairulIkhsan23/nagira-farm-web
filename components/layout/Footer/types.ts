import { ReactNode } from 'react';

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

export interface FooterLink {
  title: string;
  url: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialMedia {
  name: string;
  url: string;
  icon?: ReactNode;
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