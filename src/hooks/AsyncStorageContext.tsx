import React, {createContext, useContext, ReactNode} from 'react';
import useAsyncStorage from './useAsyncStorage';

interface AsyncStorageContextType {
  storedValue: any;
  error: string | null;
  getData: (key: string) => Promise<void>;
  storeData: (key: string, value: any) => Promise<void>;
  clearData: (key: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

interface AsyncStorageProviderProps {
  children: ReactNode;
}

const AsyncStorageContext = createContext<AsyncStorageContextType | undefined>(
  undefined,
);

export const AsyncStorageProvider: React.FC<AsyncStorageProviderProps> = ({
  children,
}) => {
  const asyncStorage = useAsyncStorage();

  return (
    <AsyncStorageContext.Provider value={asyncStorage}>
      {children}
    </AsyncStorageContext.Provider>
  );
};

export const useAsyncStorageContext = (): AsyncStorageContextType => {
  const context = useContext(AsyncStorageContext);
  if (!context) {
    throw new Error(
      'useAsyncStorageContext must be used within an AsyncStorageProvider',
    );
  }
  return context;
};
