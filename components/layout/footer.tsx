import { allIconList } from 'config/security-config';
import Image from 'next/image';
import FooterSection from './footer-section';
import InfoItem from './info-item'; // Reusable component for items with icons
import SocialMediaIcon from './search/socialMediaIcon';

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white pt-16 px-4 sm:px-8 md:px-12 ">
      <div className='lg:flex sm:block md:block'>
      <div className="container mx-auto px-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
        
        <FooterSection
          title="Company Info"
          items={[
            'About BiBi Shop',
            'BiBi - Shop Like a Billionaire',
            'Affiliate & Influencer: Earn Com...',
            'Contact us',
            'Careers',
            'Press',
            'BiBi Shop Tree Planting Program',
          ]}
        />
        <FooterSection
          title="Policies"
          items={[
            'Return and refund policy',
            'Intellectual property policy',
            'Shipping info',
            'Your Recalls and Product Safety Alerts',
            'Report suspicious activity',
          ]}
        />
        <FooterSection
          title="Help"
          items={[
            'Support center & FAQ',
            'Safety center',
            'BiBi purchase protection',
            'Sitemap',
            'Partner with BiBi',
          ]}
        />
</div>

        <div className=' sm:w-[100%] md:w-[100%] lg:w-[50%] '>
          <h3 className="font-bold mb-8 text-[20px] font-medium leading-[100%]">Company Info</h3>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6 text-sm">
            <InfoItem icon={allIconList.exclusiveIcon} text="Exclusive offers" />
            <InfoItem icon={allIconList.trackIcon} text="Track orders any time" />
            <InfoItem icon={allIconList.footerOneIcon} text="Faster & more secure checkout" />
            <InfoItem icon={allIconList.footerOneIcon} text="Low stock items alerts" />
            <InfoItem icon={allIconList.PricedropIcon} text="Price-drop alerts" />
          </div>
          <div className="flex space-x-6 mt-8">
  {/* Apple Store Button */}
  <a
    href="#"
   className="flex items-center space-x-3 bg-black text-white px-[8px] md:px-[26px] py-[8px] md:py-[12px] rounded-[40px] border border-[0.5px] border-white shadow-lg hover:bg-gray-800"
  >
    <Image
      src={allIconList.apple}  
      alt="Apple Logo"
      className="h-6 w-6"
    />
    <div className="flex flex-col">
      <span className="text-xs">Download on the</span>
      <span className="text-sm font-semibold">Apple Store</span>
    </div>
  </a>

 
  {/* Google Play Button */}
  <a
    href="#"
    className="flex items-center space-x-3 bg-black text-white px-[16px] md:px-[30px] py-[12px] rounded-[40px] border border-[0.5px] border-gray-300 shadow-lg hover:bg-gray-800"
  >
    <Image
      src={allIconList.playstore} 
      alt="Google Play Logo"
      className="h-6 w-6"
    />
    <div className="flex flex-col">
      <span className="text-xs">Download on the</span>
      <span className="text-sm font-semibold">Google Play</span>
    </div>
  </a>

</div>
<div>
<h3 className="text-white text-[17px] font-normal font-medium mt-6 mb-3" >Connect with Bibi Shop</h3>
<div className="flex items-center gap-4">
        <SocialMediaIcon
          href="#"
          src={allIconList.groupIcon} 
          alt="Instagram"
          label="Instagram"
        />
          <SocialMediaIcon
          href="#"
          src={allIconList.groupIcon1} 
          alt="Instagram"
          label="Instagram"
        />
         <SocialMediaIcon
          href="#"
          src={allIconList.Twitter} 
          alt="Instagram"
          label="Instagram"
        />
        <SocialMediaIcon
          href="#"
          src={allIconList.youtube} 
          alt="Instagram"
          label="Instagram"
        />
        </div>
</div>
        </div>
          
        </div>
  
      <div className="container mx-auto px-6 mt-10">
        <div className=" pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* <div className="border-t border-gray-700 pt-6 grid grid-cols-2 gap-8"> */}
          <div>
            <h3 className="font-bold mb-4">Security certification</h3>
            <div className="flex gap-4">
              <Image src={allIconList.Security7} alt="Security 1" className="h-8" />
              <Image  src={allIconList.Security6} alt="Security 2" className="h-8" />
              <Image  src={allIconList.Security5} alt="Security 3" className="h-8" />
              <Image  src={allIconList.security3} alt="Security 3" className="h-8" />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">We accept</h3>
            <div className="flex gap-4 flex-wrap">
              <Image src={allIconList.PayIcon} alt="Payment 1" className="h-8" />
              <Image src={allIconList.Banklogo3} alt="Payment 1" className="h-8" />
              <Image src={allIconList.BankIcon2} alt="Payment 1" className="h-8" />
              <Image src={allIconList.BankIcon4} alt="Payment 1" className="h-8" />
              <Image src={allIconList.BankIcon5} alt="Payment 1" className="h-8" />
              
            </div>
          </div>
        </div>
        <div className="text-center border-t py-8 border-gray-700 text-sm text-white mt-6">
  <div className="flex justify-center space-x-4">
    <span>© 2022—2025 WhaleCo Inc.</span>
    <span>Terms of use</span>
    <span>Privacy policy</span>
    <span>Your privacy choices</span>
    <span>Ad Choices</span>
  </div>
</div>
      </div>
    </footer>
  );
}
