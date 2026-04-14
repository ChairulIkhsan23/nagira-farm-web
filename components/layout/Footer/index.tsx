// Footer.tsx - Layout dengan Contact dan Links sejajar (sampingan)
'use client';

import FooterBrand from './FooterBrand';
import FooterContact from './FooterContact';
import FooterLinks from './FooterLinks';
import FooterBottom from './FooterBottom';
import { FooterProps } from '@/types';
import {
  DEFAULT_CONTACT_INFO,
  DEFAULT_SECTIONS,
  DEFAULT_SOCIAL_MEDIA
} from '@/constants';

export default function Footer({
  companyName = 'Nagira Farm',
  tagline = 'Tingkatkan Kemandirian dan Ketahanan Pangan',
  contactInfo = DEFAULT_CONTACT_INFO,
  sections = DEFAULT_SECTIONS,
  socialMedia = DEFAULT_SOCIAL_MEDIA,
  copyrightText = 'Peternakan Domba Berkualitas.',
  year: propYear,
  className = ''
}: FooterProps) {
  const currentYear = propYear || new Date().getFullYear();

  return (
    <footer className={`bg-green-800 text-white ${className}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Brand */}
        <FooterBrand companyName={companyName} tagline={tagline} />

        {/* Contact dan Links sejajar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Contact di kiri */}
          <FooterContact contactInfo={contactInfo} />

          {/* Links di kanan */}
          <FooterLinks sections={sections} />
        </div>
      </div>

      <FooterBottom
        companyName={companyName}
        copyrightText={copyrightText}
        year={currentYear}
        socialMedia={socialMedia}
      />
    </footer>
  );
}