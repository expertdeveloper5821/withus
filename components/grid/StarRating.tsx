import React from 'react';

interface StarRatingProps {
  rating: number; // Example: 4 = 4 filled, 1 outlined
  totalStars?: number; // Default is 5
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className = "w-4 h-4" }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i <= rating ? "#454544" : "none"} // Tailwind slate-800
        viewBox="0 0 24 24"
        stroke="#454544"
        strokeWidth={2}
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.975 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.974-2.89a1 1 0 00-1.175 0l-3.974 2.89c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.975-2.89c-.783-.57-.38-1.81.588-1.81h4.911a1 1 0 00.95-.69l1.519-4.674z"
        />
      </svg>
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
}

export default StarRating;
  