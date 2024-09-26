'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type CompressionType = 'by-level' | 'by-level-no-img' | 'by-img';

interface CompressionState {
  compressType: CompressionType;
  compressLevel?: number;
  enhancementLevel?: string;
  dpi?: number;
  files: File[];
  rotationParameters: { [index: number]: number };
  rgb: boolean;
}

interface CompressionContextType {
  state: CompressionState;
  updateCompressionType: (type: CompressionType) => void;
  updateCompressLevel: (level: number) => void;
  updateEnhancementLevel: (level: string) => void;
  updateDpi: (dpi: number) => void;
  updateFiles: (files: File[]) => void;
  updateRotationParameters: (params: { [index: number]: number }) => void;
  updateRgb: (rgb: boolean) => void;
}

const LOCAL_STORAGE_KEY = 'compressionState';
const CompressionContext = createContext<CompressionContextType | undefined>(
  undefined
);

export const CompressionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CompressionState>({
    compressType: 'by-level',
    compressLevel: 5,
    enhancementLevel: '0',
    dpi: 150,
    files: [],
    rotationParameters: {},
    rgb: true,
  });

  useEffect(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      setState(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateCompressionType = (type: CompressionType) => {
    setState(prevState => ({ ...prevState, compressType: type }));
  };

  const updateCompressLevel = (level: number) => {
    setState(prevState => ({ ...prevState, compressLevel: level }));
  };

  const updateEnhancementLevel = (level: string) => {
    setState(prevState => ({ ...prevState, enhancementLevel: level }));
  };

  const updateDpi = (dpi: number) => {
    setState(prevState => ({ ...prevState, dpi }));
  };

  const updateFiles = (files: File[]) => {
    setState(prevState => ({ ...prevState, files }));
  };

  const updateRotationParameters = (params: { [index: number]: number }) => {
    setState(prevState => ({
      ...prevState,
      rotationParameters: { ...prevState.rotationParameters, ...params },
    }));
  };

  const updateRgb = (rgb: boolean) => {
    setState(prevState => ({ ...prevState, rgb }));
  };

  return (
    <CompressionContext.Provider
      value={{
        state,
        updateCompressionType,
        updateCompressLevel,
        updateEnhancementLevel,
        updateDpi,
        updateFiles,
        updateRotationParameters,
        updateRgb,
      }}
    >
      {children}
    </CompressionContext.Provider>
  );
};

export const useCompressionContext = () => {
  const context = useContext(CompressionContext);
  if (!context) {
    throw new Error(
      'useCompressionContext must be used within a CompressionProvider'
    );
  }
  return context;
};
