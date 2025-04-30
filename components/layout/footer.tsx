import React from 'react';
import FooterSection from './footer-section';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> {/* Responsive grid */}
        {/* Company Info Section */}
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

        {/* Policies Section */}
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

        {/* Help Section */}
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

        {/* App Download Section */}
        <div>
          <h3 className="font-bold mb-4">Download Our App</h3>
          <ul className="space-y-2 text-sm">
            <li>Exclusive offers</li>
            <li>Faster & more secure checkout</li>
            <li>Price-drop alerts</li>
            <li>Track orders any time</li>
            <li>Low stock items alerts</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <div className="border border-gray-300 rounded-lg p-2"> {/* Added border */}
              <img
                src="/images/app-store.png" // Ensure this image is in the public/images folder
                alt="Download on the App Store"
                className="h-10"
              />
            </div>
            <div className="border border-gray-300 rounded-lg p-2">
            <img
              src="/images/google-play.png" // Ensure this image is in the public/images folder
              alt="Download on Google Play"
              className="h-10"
            />
            </div>
          </div>
        </div>
      </div>

      {/* Security and Payment Section */}
      <div className="container mx-auto px-6 mt-10">
        <div className="border-t border-gray-700 pt-6 grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4">Security certification</h3>
            <div className="flex gap-4">
              {/* {securityImages.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} className="h-8" />
              ))} */}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">We accept</h3>
            <div className="flex gap-4 flex-wrap">
              <img src="/images/payment1.png" alt="Payment 1" className="h-8" />
              <img src="/images/payment2.png" alt="Payment 2" className="h-8" />
              <img src="/images/payment3.png" alt="Payment 3" className="h-8" />
              <img src="/images/payment4.png" alt="Payment 4" className="h-8" />
              <img src="/images/payment5.png" alt="Payment 5" className="h-8" />
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-6">
          © 2022—2025 WhaleCo Inc. Terms of use | Privacy policy | Your privacy choices | Ad Choices
        </div>
      </div>
    </footer>
  );
}
