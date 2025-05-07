'use client';
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { allIconList } from "config/security-config";

interface Review {
  user: string;
  date: string;
  rating: number;
  comment: string;

}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const toggleShow = () => setShowAll((prev) => !prev);

  return (
    <>
    <div className="mx-auto p-4 text-black">
    {/* Model Info */}
    <div className="flex items-start space-x-4">
      <Image
        src={allIconList.ProfileIcon} // Place the image in public/model.png
        alt="Model"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Model is wearing:</span> UZ L &nbsp;|&nbsp;
          <span className="font-medium">Model is wearing:</span> UZ L
        </p>
        <p className="text-gray-500">
          Height: 178 cm &nbsp; Bust: 96 cm &nbsp; Waist: 80 cm &nbsp; Hips: 101 cm
        </p>
      </div>
    </div>

    {/* Rating & Reviews */}
    <div>
      <div className="flex items-center space-x-2">
        <p className="font-semibold text-lg">3,346 reviews</p>
        <div className="flex items-center text-yellow-500">
          {/* {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))} */}
        </div>
        <span className="text-sm text-gray-600">4.5/5</span>
      </div>
      <p className="mt-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mb-4">
        All reviews are from verified purchases
      </p>
    </div>

    {/* Fit Percentage Bars */}
    <div className="space-y-3">
  {[
    { label: 'Small', value: 10 },
    { label: 'True to size', value: 90 },
    { label: 'Large', value: 8 }
  ].map(({ label, value }) => (
    <div key={label} className="flex items-center space-x-2 text-sm">
      {/* Label */}
      <div className="w-24 text-left">{label}</div>

      {/* Bar */}
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${value}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <div className="w-8 text-right">{value}%</div>
    </div>
  ))}
</div>

    {/* Tags */}
    <div className="flex flex-wrap gap-4 text-sm mt-4">
  {['Comfortable (159)', 'Cool (300)', 'Beautiful track suit (300)'].map((tag, idx) => (
    <button
      key={idx}
      className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-200"
    >
      {tag}
    </button>
  ))}
</div>
  </div>
    <div className="space-y-6 mt-6">

      {visibleReviews.map((review, i) => (
        <div key={i} className="flex items-start space-x-4 text-black">
          <Image
            src={allIconList.ProfileIcon}
            alt={review.user}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{review.user}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: review.rating }, (_, i) => (
                <StarIcon key={i} className="w-4 h-4" />
              ))}
            </div>
            <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
          </div>
        </div>
      ))}

      {reviews.length > 3 && (
        <button
          onClick={toggleShow}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          {showAll ? "Show less" : "Show more reviews"}
        </button>
      )}
    </div>
    </>
  );
};

export default ReviewList;
