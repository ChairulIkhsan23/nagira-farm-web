'use client';

import Link from 'next/link';
import { FooterSection } from './types';

interface FooterLinksProps {
  sections: FooterSection[];
}

export default function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10">
        {sections.map((section, idx) => (
          <div key={idx}>
            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">
              {section.title}
            </h3>

            {/* Links */}
            <ul className="space-y-2.5">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.url}
                    className="group relative inline-block text-green-200 text-sm transition-all duration-300 ease-out hover:text-white hover:translate-x-1.5"
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-green-400 transition-all duration-300 ease-out group-hover:w-3"></span>
                    <span className="inline-block transition-all duration-300 ease-out group-hover:translate-x-4">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}