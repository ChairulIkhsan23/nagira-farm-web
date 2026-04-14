'use client';

import SocialIcons from './SocialIcons';
import { SocialMedia } from './types';

interface FooterBottomProps {
  companyName: string;
  copyrightText: string;
  year: number;
  socialMedia: SocialMedia[];
}

export default function FooterBottom({
  companyName,
  copyrightText,
  year,
  socialMedia
}: FooterBottomProps) {
  return (
    <div className="w-full bg-[#419255] pt-6 pb-6 mt-12">
      {/* Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          {/* Copyright */}
          <div>
            <p className="text-white text-sm">
              © {year} {companyName} | {copyrightText}
            </p>
          </div>

          {/* Social Media */}
          <SocialIcons socialMedia={socialMedia} />
        </div>
      </div>
    </div>
  );
}