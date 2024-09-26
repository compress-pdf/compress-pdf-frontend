'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const UploadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export const UploadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UploadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </UploadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(UploadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a UploadingProvider');
  }
  return context;
};
