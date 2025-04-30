'use client'
import React, { Children } from 'react';

import Price from 'components/price';
import InfoCard from 'components/InfoCard';
import { useFormStatus } from 'react-dom';
import LoadingDots from 'components/loading-dots';
import { redirectToCheckout } from 'components/cart/actions';
import { useRouter } from 'next/navigation';



interface Cart {
  cost: {
    totalAmount: {
      amount: any;
      currencyCode: string;
    };
  };
}

interface OrderSummaryProps {
  cart?: Cart;
}

const paymentMethods = ['PayPal', 'Visa', 'Mastercard', 'Discover', 'Diners', 'JCB', 'UnionPay', 'Apple Pay', 'Google Pay'];
const securityCerts = ['SSL', 'PCI', 'ID Check', 'SafeKey'];

const CheckIcon = () => (
  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

interface GridDisplayProps {
  title: string;
  items: string[];
  columns?: number;
}

const GridDisplay: React.FC<GridDisplayProps> = ({ title, items, columns = 5 }) => (
  <div>
    <p className="text-sm font-medium text-gray-900 mb-2">{title}</p>
    <div className={`grid grid-cols-${columns} gap-2`}>
      {items.map((item) => (
        <div key={item} className="h-8 bg-gray-100 rounded flex items-center justify-center p-1">
          <span className="text-xs text-gray-500">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart  }) => {
  const router =useRouter()
  const handleCheckout = () => {
    router.push('/checkout');    
  };
  return (
    <div className="lg:w-1/3 mt-8 lg:mt-0">
      <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between pb-4 border-b border-gray-200">
            <span className="text-gray-600">Estimated total</span>
            <span className="font-medium">
              {cart ? (
                <Price
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              ) : (
                'CA$0.00'
              )}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Taxes and delivery fees are calculated on the next page.
          </p>
      <button onClick={() => handleCheckout()}>
      Go to Checkout
    </button>
    <form action={redirectToCheckout} className="mt-6">
        <CheckoutButton  />
      </form>

   


          <div className="mt-4 space-y-4">
            <InfoCard title="You will not be charged until you review this order on the next page"  icon={<CheckIcon/>}/>
            <InfoCard
              title="Safe Payment Options"
              icon={<CheckIcon/>}
              description="Temu is committed to protecting your payment information. We follow PCI DSS standards, use strong encryption, and perform regular reviews of systems to protect your privacy."
            />
            <GridDisplay title="1. Payment methods" items={paymentMethods} />
            <GridDisplay title="2. Security certification" items={securityCerts} columns={4} />
            <InfoCard
              title="Secure privacy"
              description="Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you."
              linkText="Learn more"
              linkHref="#"
              icon={<CheckIcon/>}
            />
            <InfoCard
              title="Temu Purchase Protection"
              description="Shop confidently on Temu knowing that if something goes wrong, we've always got your back."
              linkText="See program terms"
              linkHref="#"
              icon={<CheckIcon/>}
            />
            <div className="flex items-start pt-2">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Temu's Tree Planting Program &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
function CheckoutButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-full font-medium transition-colors"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoadingDots className="bg-white" /> : 'Checkout  (0)'}
      </button>
    );
  }
  