'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type ShowScreen = 'loading' | 'home' | 'customize';

interface FooterContextType {
  showScreen: ShowScreen;
  setShowScreen: (value: ShowScreen) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider = ({ children }: { children: ReactNode }) => {
  // State is initialized to 'home' by default
  const [showScreen, setShowScreenState] = useState<ShowScreen>('home');

  // Read from localStorage after the component has mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScreen = localStorage.getItem('showScreen') as ShowScreen;
      if (storedScreen) {
        setShowScreenState(storedScreen);
      }
    }
  }, []);

  // Update localStorage whenever `showScreen` changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showScreen', showScreen);
    }
  }, [showScreen]);

  const setShowScreen = (value: ShowScreen) => {
    setShowScreenState(value);
  };

  return (
    <FooterContext.Provider value={{ showScreen, setShowScreen }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooterContext = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooterContext must be used within a FooterProvider');
  }
  return context;
};
