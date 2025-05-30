import React from 'react';

interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  icon?: React.ReactNode;
  className?: string; 
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  linkText,
  linkHref,
  icon,
}) => {
  return (
    <div className={`bg-white flex items-start pt-4 border-t border-gray-200`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">{icon && icon}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          {linkText && linkHref && (
            <a href={linkHref} className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
              {linkText} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
