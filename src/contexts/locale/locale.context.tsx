import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Locale, LocaleContextType } from './types';


const LocaleContext = createContext<LocaleContextType>({
    locale: 'en',
    toggleLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

    const [locale, setLocale] = useState<Locale>('en');

    const toggleLocale = () => {
        setLocale(locale === 'en' ? 'de' : 'en');
    };

    return <LocaleContext.Provider value={{ locale, toggleLocale }}>
        {children}
    </LocaleContext.Provider>;
};

export const useLocale = () => {
    return useContext(LocaleContext);
};