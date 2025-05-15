'use client';
import React from 'react';
import Image from 'next/image';

interface SocialMediaIconProps {
  href: string;
  src: any;
  alt: string;
  label: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ href, src, alt, label }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center w-10 h-10 "
      aria-label={label}
    >
      <Image src={src} alt={alt} width={24} height={24} />
    </a>
  );
};

export default SocialMediaIcon;