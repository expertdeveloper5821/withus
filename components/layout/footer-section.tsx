import React from 'react';

interface FooterSectionProps {
  title: string;
  items: string[];
}

export default function FooterSection({ title, items }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-bold mb-9 text-[20px] font-medium leading-[100%]">{title}</h3>
      <ul className="space-y-2 mt-6 text-[16px] font-normal leading-[100%]">
        {items.map((item, index) => (
          <li key={index} className='mb-6'>{item}</li>
        ))}
      </ul>
    </div>
  );
}
