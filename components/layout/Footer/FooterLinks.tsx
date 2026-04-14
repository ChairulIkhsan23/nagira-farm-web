'use client';

import Link from 'next/link';
import { FooterSection } from '@/types';

interface FooterLinksProps {
  sections: FooterSection[];
}

export default function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
      {sections.map((section, idx) => (
        <div key={idx}>
          {/* Title */}
          <h3 className="text-white font-semibold text-sm md:text-base mb-3">
            {section.title}
          </h3>

          {/* Links */}
          <ul className="space-y-1.5">
            {section.links.map((link, linkIdx) => (
              <li key={linkIdx}>
                <Link
                  href={link.url}
                  className="text-green-200 hover:text-white text-xs md:text-sm transition-all duration-200 hover:translate-x-1 block"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}