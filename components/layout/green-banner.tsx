import React from 'react';

interface GreenBannerProps {
  title: string;
  items: { icon: string; text: string }[];
  reminder: string;
  linkText: string;
}

export default function GreenBanner({
  title,
  items,
  reminder,
  linkText,
}: GreenBannerProps) {
  return (
    <div className="bg-green-500 text-white rounded-lg ">
      <div className="flex items-center justify-between p-2">
        <h3 className="font-bold flex items-center">
          <span className="material-icons mr-2">shield</span> {title}
        </h3>
        <div className="flex items-center gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
             <img src={item.icon} alt={item.text} className="w-6 h-6" />
              <span>{item.text}</span>
              {index < items.length - 1 && <span className="mx-2">|</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 bg-white text-green-700 rounded-lg p-2">
        <div className="flex items-center">
          <span className="material-icons mr-2">notifications</span>
          <span>{reminder}</span>
        </div>
        <a href="#" className="text-green-500 font-bold">
          {linkText}
        </a>
      </div>
    </div>
  );
}
