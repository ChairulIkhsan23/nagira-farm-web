'use client';

import Image from 'next/image';

interface FooterBrandProps {
  companyName: string;
  tagline: string;
}

export default function FooterBrand({ companyName, tagline }: FooterBrandProps) {
  return (
    <div className="mb-12 mt-6">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <Image
          src="/logo/logo.svg"
          alt={companyName}
          width={64}
          height={64}
          className="h-20 w-auto"
          priority
        />

        {/* Text (Brand + Tagline) */}
        <div className="flex flex-col pt-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {companyName}
          </h2>

          <p className="text-green-200 text-xs md:text-base leading-snug">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}