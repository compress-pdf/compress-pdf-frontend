'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  loading: boolean;
  progress: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
const UploadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export const UploadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // useEffect(() => {
  //   console.log(progress);
  // }, [progress]);

  return (
    <UploadingContext.Provider
      value={{ loading, progress, setLoading, setProgress }}
    >
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
