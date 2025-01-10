'use client';
import type { ReactNode } from 'react';
import Loader from '@/components/common/Loader';
import { useLocale } from 'next-intl';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CommonProviderProps = {
  children: ReactNode;
};

type CommonContextType = {
  locale: string;
  theme: string;
  toggleTheme: () => void;
  startLoader: () => void;
  stopLoader: () => void;
};

const CommonContext = createContext<CommonContextType | null>(null);

export const CommonProvider = ({ children }: CommonProviderProps) => {
  const locale = useLocale();
  const [theme, setTheme] = useState('light');

  // For triggering Loader
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderStack, setLoaderStack] = useState<number>(0);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const startLoader = () => {
    setLoaderStack(stack => stack + 1);
  };

  const stopLoader = () => {
    setLoaderStack(stack => Math.max(0, stack - 1));
  };

  useEffect(() => {
    setLoading(loaderStack > 0);
  }, [loaderStack]);

  // Wrap the context value in useMemo to avoid re-creation on every render
  const contextValue = useMemo(
    () => ({ locale, theme, toggleTheme, startLoader, stopLoader }),
    [locale, theme],
  );

  return (
    <CommonContext.Provider value={contextValue}>
      {loading && <Loader />}
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommon must be used within a CommonProvider');
  }
  return context;
};
