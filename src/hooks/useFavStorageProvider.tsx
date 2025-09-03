import React, { createContext, useContext } from 'react';
import { FavStorage } from '@/utils/favoritesStorage';

interface IFavStorageContext {
  save: (id: number) => void;
  remove: (id: number) => void;
  getAll: () => number[];
  check: (id: number) => boolean;
}

const FavStorageContext = createContext<IFavStorageContext>({
  save: () => {
    throw new Error('Use context inside provider');
  },
  remove: () => {
    throw new Error('Use context inside provider');
  },
  getAll: () => {
    throw new Error('Use context inside provider');
  },
  check: () => {
    throw new Error('Use context inside provider');
  },
});

export function FavStorageProvider({ children }: { children: React.ReactNode }) {
  return (
    <FavStorageContext.Provider
      value={{
        save: (id: number) => FavStorage.setId(id),
        remove: (id: number) => FavStorage.removeId(id),
        getAll: () => FavStorage.getAllIds(),
        check: (id: number) => FavStorage.idExists(id),
      }}
    >
      {children}
    </FavStorageContext.Provider>
  );
}

export const useFavStorageContext = () => useContext(FavStorageContext);
