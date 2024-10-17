'use client';
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios'; // For making the API request

import { API_URL } from '@/constants/credentials/const';

interface StarRatingProps {
  totalStars?: number;
  editing?: boolean;
  onRate: (rate: number) => void;
  toolId: number; // Add toolId as a prop to fetch the rating data for each tool
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
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
        const response = await axios.get(
          `${API_URL}/v1/ratings?tool_id=${toolId}`
        );
        setAverageRating(response.data.average_rating);
        setTotalVotes(response.data.total_ratings);
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchRatingData();
  }, [toolId]);

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    onRate(newRating); // Call the parent's handler to submit the rating
  };

  return (
    <section className="text-5xl text-black flex justify-center flex-col gap-[11px] items-center my-[28.51px]">
      <ReactStars
        count={totalStars}
        value={rating}
        onChange={handleStarClick}
        size={32}
        isHalf={false}
        edit={editing}
        activeColor="#FF8224"
        color="#E0E0E0"
      />

      {/* Display the average rating and total votes */}
      <p className="text-[0.875rem] text-[#FF8224] mt-4 font-semibold">
        Rating: {averageRating !== null ? averageRating.toFixed(1) : '0.0'} /{' '}
        {totalStars} - {totalVotes} votes
      </p>
    </section>
  );
};

export default StarRating;
