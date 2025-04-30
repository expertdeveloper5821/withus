import React from 'react';

const TopBanner = () => {
  const items = [
    { icon: '🚚', text: 'Free shipping', subtext: 'Special for you' },
    { icon: '💳', text: 'CA$10 off', subtext: 'On orders over CA$100' },
    { icon: '📦', text: 'Delivery guarantee', subtext: 'Refund for any issues' },
    { icon: '📱', text: 'Get the Temu App', subtext: '' },
  ];

  return (
    <div className="bg-black text-white flex justify-evenly items-center px-4 py-2 text-sm justify-center">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-r border-gray-700 px-8 last:border-none"
        >
          <span className="text-lg">{item.icon}</span>
          <div className="flex flex-col">
            <p className="font-semibold flex items-center gap-1">
              {item.text} <span className="text-gray-400 text-xs">›</span>
            </p>
            {item.subtext && <p className="text-gray-400 text-xs">{item.subtext}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopBanner;
