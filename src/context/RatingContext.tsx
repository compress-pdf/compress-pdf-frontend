// context/RatingContext.tsx

'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '@/constants/credentials/const';

interface RatingContextProps {
  ratings: Record<string, string>; // Tool ID to session ID
  isRated: (toolId: number) => boolean;
  addRating: (toolId: number, rating: number) => Promise<void>;
}

const RatingContext = createContext<RatingContextProps | undefined>(undefined);

export const RatingProvider = ({ children }: { children: React.ReactNode }) => {
  const [ratings, setRatings] = useState<Record<string, string>>({});

  // Load ratings from sessionStorage on mount
  useEffect(() => {
    const storedRatings = sessionStorage.getItem('rating');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  // Check if a tool (or file) has already been rated
  const isRated = (toolId: number) => {
    return !!ratings[toolId]; // Check if toolId exists in the ratings
  };

  // Add a rating to the state and save to sessionStorage
  const addRating = async (toolId: number, rating: number) => {
    try {
      const response = await axios.post(`${API_URL}/v1/ratings`, {
        tool_id: toolId,
        rating: rating,
      });

      // Assuming session_id is returned in the response
      const sessionId = response.data.session_id;

      // Update the state and sessionStorage
      const updatedRatings = {
        ...ratings,
        [toolId]: sessionId, // Store sessionId by toolId
      };
      setRatings(updatedRatings);
      sessionStorage.setItem('rating', JSON.stringify(updatedRatings));
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <RatingContext.Provider value={{ ratings, isRated, addRating }}>
      {children}
    </RatingContext.Provider>
  );
};

// Custom hook to use the RatingContext
export const useRatingContext = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }
  return context;
};
