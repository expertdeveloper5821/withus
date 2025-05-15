import Image from 'next/image';
import React from 'react';

interface InfoItemProps {
  icon: string;
  text: string;
}

export default function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div className="flex items-center text-[16px]  font-normal  ">
      <Image src={icon} alt={text} className="h-5 w-5 mr-2" />
      <span className='line-clamp-1 '>{text} </span>
    </div>
  );
}
