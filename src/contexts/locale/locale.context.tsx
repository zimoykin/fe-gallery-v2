import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Locale, LocaleContextType } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const defaultLocale: Locale = 'en';

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const { locale: storedLocale } = useSelector((state: RootState) => state.locale);
    const [locale, setLocale] = useState<Locale>(storedLocale || defaultLocale);

    const toggleLocale = () => {
        setLocale((prevLocale) => (prevLocale === 'en' ? 'de' : 'en'));
    };

    const setLocaleFromStorage = (locale: Locale) => {
        setLocale(locale);
    };

    return (
        <LocaleContext.Provider value={{ locale, toggleLocale, setLocaleFromStorage }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = (): LocaleContextType => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    } else
        return context;
};
