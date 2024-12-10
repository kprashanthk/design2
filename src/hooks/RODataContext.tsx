import React, {createContext, useContext, useState, ReactNode} from 'react';
import {ROData as initialROData} from '../RoProcessData';

// Define the context type
interface RODataContextType {
  ROData: any;
  setROData: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context
const RODataContext = createContext<RODataContextType | undefined>(undefined);

// Create the provider
export const RODataProvider = ({children}: {children: ReactNode}) => {
  const [ROData, setROData] = useState(initialROData);

  return (
    <RODataContext.Provider value={{ROData, setROData}}>
      {children}
    </RODataContext.Provider>
  );
};

// Custom hook to use the ROData context
export const useROData = () => {
  const context = useContext(RODataContext);
  if (!context) {
    throw new Error('useROData must be used within a RODataProvider');
  }
  return context;
};
