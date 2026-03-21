"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type FavouriteItem = {
  id: string;
  kind: "business" | "job" | "event";
  title: string;
  subtitle: string;
  href: string;
};

type FavouritesContextType = {
  favourites: FavouriteItem[];
  isFavourite: (id: string) => boolean;
  toggle: (item: FavouriteItem) => void;
};

const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  isFavourite: () => false,
  toggle: () => {},
});

const STORAGE_KEY = "ghconnect-favourites";

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavourites(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {}
  }, [favourites, loaded]);

  const isFavourite = useCallback(
    (id: string) => favourites.some((f) => f.id === id),
    [favourites]
  );

  const toggle = useCallback((item: FavouriteItem) => {
    setFavourites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) return prev.filter((f) => f.id !== item.id);
      return [...prev, item];
    });
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggle }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
