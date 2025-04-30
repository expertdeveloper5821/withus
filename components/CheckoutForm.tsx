
"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to API or handle payment
    console.log("Submitting:", formData);
  };
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lineItems: [
          {
            variantId: 'gid://shopify/ProductVariant/1234567890',
            quantity: 1,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl; 
    } else {
      alert('Failed to create checkout');
    }

    setLoading(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
        required
      />
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={formData.cardNumber}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Pay Now
      </button>
    </form>
     <button onClick={handleCheckout} disabled={loading}>
     {loading ? 'Redirecting...' : 'Start Checkout'}
   </button>
   </>
  );
}
