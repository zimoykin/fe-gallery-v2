import React, { useEffect } from "react";
import { useTheme } from "../contexts/theme/theme-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toDark, toLight, toSystem } from "../features/thema/thema-slice";
import { useLocale, translate } from "../contexts/locale";

const ToggleThemeComponent: React.FC = () => {

    const { theme, setTheme } = useTheme();
    const { locale } = useLocale();
    const dispatch = useDispatch();
    const themaStored = useSelector((state: RootState) => state.thema.thema);

    useEffect(() => {
        setTheme(themaStored || 'system');
    }, [themaStored, theme, setTheme]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const getNextThemeName = () => {
        const themes = [
            'system',
            'light',
            'dark'
        ];

        const index = themes.indexOf(theme);

        if (index === -1) {
            return 'system';
        }
        if (index === themes.length - 1) {
            return themes[0];
        }
        return themes[index + 1];
    };

    const toggleTheme = () => {
        const themeNext = getNextThemeName();
        switch (themeNext) {
            case 'light':
                dispatch(toLight());
                setTheme('light');
                break;
            case 'dark':
                dispatch(toDark());
                setTheme('dark');
                break;
            default:
                dispatch(toSystem());
                setTheme('system');
                break;
        }
    };

    return (
        <div className='p-1 flex flex-row justify-end items-center hover:scale-105 cursor-pointer'
            onClick={toggleTheme}
        >
            {theme === 'light' ? <i className="p-1 fa-solid fa-sun" /> : null}
            {theme === 'dark' ? <i className="p-1 fa-solid fa-moon" /> : null}
            {theme === 'system' ? <i className="p-1 fa-solid fa-gear" /> : null}
            <span className="uppercase">{translate[locale][theme]}</span>
        </div>
    );

};


export default ToggleThemeComponent;