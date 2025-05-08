import { allIconList } from 'config/security-config';
import Image from 'next/image';

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
    <div className="  text-white rounded-lg  border rounded-[20px] " style={{  borderColor: '#0A8800 '}}>
      <div className="flex items-center justify-between py-2 px-2 md:py-3 md:px-8 rounded-[6px] md:rounded-t-[7px]" style={{ backgroundColor:'#0A8800'}}>
        <h3 className=" flex items-center text-[14px]">
        <Image
                 src={allIconList.Sheild}
                    alt="Lightning Icon"
                    width={20}
                    height={20}
                    className=" mr-2"
                  />{title}
        </h3>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        {items.map((item: any, index) => (
    <div
      key={index}
      className={`flex items-center gap-2 text-center sm:text-left  ${
        index > 0 ? 'hidden sm:flex' : ''
      }`}
    >
      <img src={item.icon.src} alt={item.text} className="w-5 h-5" />
      <span
        style={{
          fontSize: '13.89px',
          fontWeight: '400',
          lineHeight: '1.5',
        }}
      >
        {item.text}
      </span>
      {index < items.length - 1 && (
        <span className="hidden sm:inline mx-2">|</span>
      )}
    
    </div>
    
   
  ))}
          {/* {items.map((item:any, index) => (
            <div key={index} className="flex items-center gap-2 ">
             <img src={item.icon.src} alt={item.text} className="w-5 h-5" />
              <span style={{fontSize:'13.89px', fontWeight:'400', lineHeight:'1.5'}} >{item.text}</span>
              {index < items.length - 1 && <span className="mx-2">|</span>}
            </div>
          ))} */}
             <Image
                   src={allIconList.whiteArrowIcon}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="h-4 mr-1"
                  />
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-between bg-white text-green-700 p-3 px-4 border-b rounded-b-[12px]">
        <div className="flex items-center text-[14px]">
            <Image
                   src={allIconList.Group}
                    alt="Lightning Icon"
                    width={24}
                    height={24}
                    className="h-4 mr-1"
                  />
          <p className='font-medium'>Security reminder:<span style={{fontWeight:'400'}}>{reminder}</span></p>
        </div>
        <div className='flex items-center'>
        <a href="#" className="text-green  text-right text-[14px]  ml-4">
          {linkText}
        </a>
        <Image
                   src={allIconList.GreenArrowIcon}
                    alt="Lightning Icon"
                    width={18}
                    height={18}
                    className="h-3 mr-2"
                  />
                  </div>
      </div>
    </div>
  );
}
