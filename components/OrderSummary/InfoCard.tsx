import Image from "next/image";

interface InfoCardProps {
    iconUrl: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    listItems?: string[]; 
  }
  
  const InfoCard: React.FC<InfoCardProps> = ({
    iconUrl,
    title,
    description,
    linkText,
    linkHref,
    listItems,
  }) => {
    return (
      <div className="flex items-start space-x-3">
        <Image src={iconUrl} alt={title} className="w-5 h-5 mt-1" />
        <div>
          <h3 className="font-semibold text-black text-base">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
          {listItems && (
            <ul className="list-disc ml-5 text-sm mt-1 text-gray-700">
              {listItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          <a href={linkHref} className="text-[#00000066] font-medium mt-1 inline-block">
            {linkText} →
          </a>
        </div>
      </div>
    );
  };
  
  export default InfoCard;
  