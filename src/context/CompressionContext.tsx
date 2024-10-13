'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { setItemInDB, getItemFromDB, clearDB } from '@/services/indexedDB';

type CompressionType = 'by-level' | 'by-level-no-img' | 'by-img';

interface CompressionState {
  uid: string;
  compressType: CompressionType;
  compressLevel?: number;
  enhancementLevel?: string;
  dpi?: number;
  rotationParameters: { [index: number]: number };
  rgb: 'rgb' | 'grayscale';
  files?: File[]; // To store files
}

interface CompressionContextType {
  state: CompressionState;
  updateCompressionType: (type: CompressionType) => void;
  updateCompressLevel: (level: number) => void;
  updateEnhancementLevel: (level: string) => void;
  updateDpi: (dpi: number) => void;
  updateRotationParameters: (params: { [index: number]: number }) => void;
  setFilesAndUid: (
    files: File[],
    uid: string,
    updatedState: Partial<CompressionState>
  ) => void;
  updateRgb: (rgb: 'rgb' | 'grayscale') => void;
  setFiles: (files: File[]) => void;
}

const CompressionContext = createContext<CompressionContextType | undefined>(
  undefined
);

export const CompressionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CompressionState>({
    uid: '',
    compressType: 'by-level',
    compressLevel: 5,
    enhancementLevel: '0',
    dpi: 150,
    rotationParameters: {},
    rgb: 'rgb',
    files: [], // Initialize as an empty array
  });

  useEffect(() => {
    const loadStateFromDB = async () => {
      const storedState = await getItemFromDB(state.uid);
      if (storedState) {
        setState(storedState);
      }
    };
    // Only load from DB if there's a valid UID
    if (state.uid) {
      loadStateFromDB();
    }
  }, [state.uid]);

  useEffect(() => {
    // Only save to IndexedDB if the uid is set
    if (state.uid) {
      setItemInDB(state.uid, state);
    }
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

  const updateRotationParameters = (params: { [index: number]: number }) => {
    setState(prevState => ({
      ...prevState,
      rotationParameters: { ...prevState.rotationParameters, ...params },
    }));
  };

  const updateRgb = (rgb: 'rgb' | 'grayscale') => {
    setState(prevState => ({ ...prevState, rgb }));
  };

  const setFilesAndUid = async (
    files: File[],
    uid: string,
    updatedState: Partial<CompressionState>
  ) => {
    // Clear the current database entry
    await clearDB();

    // Update the state with new values
    setState(prevState => ({
      ...prevState,
      ...updatedState,
      files,
      uid,
    }));
  };

  const setFiles = (files: File[]) => {
    setState(prevState => ({ ...prevState, files }));
  };

  return (
    <CompressionContext.Provider
      value={{
        state,
        updateCompressionType,
        updateCompressLevel,
        updateEnhancementLevel,
        updateDpi,
        updateRotationParameters,
        updateRgb,
        setFiles,
        setFilesAndUid,
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
