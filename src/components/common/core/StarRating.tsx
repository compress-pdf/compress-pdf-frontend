'use client';
import React, { useState, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import axios from 'axios'; // For making the API request

import { API_URL } from '@/constants/credentials/const';

// Define the custom star icon using SVG path
const CustomEmptyStar = (
  <path d="M16 2.14298L20.0059 9.73562L20.2354 10.1705L20.7199 10.2543L29.1788 11.7179L23.1957 17.8741L22.853 18.2267L22.923 18.7134L24.145 27.2106L16.4412 23.4226L16 23.2057L15.5588 23.4226L7.85505 27.2106L9.07703 18.7134L9.14702 18.2267L8.80432 17.8741L2.82119 11.7179L11.2801 10.2543L11.7646 10.1705L11.9941 9.73562L16 2.14298Z" />
);

// Define the styles for the star rating component
const starStyles = {
  itemShapes: CustomEmptyStar,
  itemStrokeWidth: 2,
  activeFillColor: '#FF8224',
  activeStrokeColor: '#FF8224',
  inactiveFillColor: '#00000000',
  inactiveStrokeColor: '#FF8224',
};

interface StarRatingProps {
  totalStars?: number;
  //   starColor?: string;
  //   emptyStarColor?: string;
  editing?: boolean;
  onRate: (rate: number) => void;
  toolId: number; // Add toolId as a prop to fetch the rating data for each tool
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  //   starColor,
  //   emptyStarColor,
  editing = true,
  onRate,
  toolId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  // Fetch rating data from API when the component loads
  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        // console.log(toolId);

        const response = await axios.get(`${API_URL}/v1/ratings?tool_id=${1}`);
        setAverageRating(response.data.average_rating);
        setTotalVotes(response.data.total_ratings);
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchRatingData();
  }, [toolId]);

  const handleStarClick = (rate: number) => {
    setRating(rate);
    onRate(rate); // Call the parent's handler to submit the rating
  };

  return (
    <section className="text-5xl text-black flex justify-center flex-col gap-[11px] items-center my-[28.51px]">
      <div className="flex gap-4 relative">
        <div className="flex gap-4 hover:bg-[#FDE9D4] p-2 rounded-full transition-all duration-300">
          <Rating
            style={{ maxWidth: 32 * totalStars + 16 * (totalStars - 1) }}
            value={rating}
            onChange={handleStarClick}
            readOnly={!editing}
            itemStyles={starStyles}
            className="flex gap-4"
          />
        </div>
      </div>

      {/* Display the average rating and total votes */}
      <p className="text-[0.875rem] text-[#FF8224] mt-4 font-semibold">
        Rating: {averageRating !== null ? averageRating.toFixed(1) : '0.0'} /{' '}
        {totalStars} - {totalVotes} votes
      </p>
    </section>
  );
};

export default StarRating;
