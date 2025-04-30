import React from 'react';

interface FooterSectionProps {
  title: string;
  items: string[];
}

export default function FooterSection({ title, items }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-bold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
