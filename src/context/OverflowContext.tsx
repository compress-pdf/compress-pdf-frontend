'use client';
import React, { createContext, useContext, useState } from 'react';

interface OverflowContextType {
  isOverflowing: boolean;
  checkOverflow: (containerId: string) => void;
}

const OverflowContext = createContext<OverflowContextType | undefined>(
  undefined
);

export const OverflowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  // Function to check if the container is overflowing
  const checkOverflow = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const hasOverflow =
        container.scrollWidth > container.clientWidth ||
        container.scrollHeight > container.clientHeight;
      setIsOverflowing(hasOverflow);
    }
  };

  return (
    <OverflowContext.Provider value={{ isOverflowing, checkOverflow }}>
      {children}
    </OverflowContext.Provider>
  );
};

// Custom hook to use the OverflowContext
export const useOverflow = () => {
  const context = useContext(OverflowContext);
  if (!context) {
    throw new Error('useOverflow must be used within an OverflowProvider');
  }
  return context;
};
