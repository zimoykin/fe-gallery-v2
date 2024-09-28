import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Locale, LocaleContextType } from './types';

const defaultLocale: Locale = 'en';

const LocaleContext = createContext<LocaleContextType>({
    locale: defaultLocale,
    toggleLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('en');

    const toggleLocale = () => {
        setLocale((prevLocale) => (prevLocale === 'en' ? 'de' : 'en'));
    };

    return (
        <LocaleContext.Provider value={{ locale, toggleLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = (): LocaleContextType => {
    return useContext(LocaleContext);
};
