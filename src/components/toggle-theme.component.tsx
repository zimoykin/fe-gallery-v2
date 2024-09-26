import React, { useEffect } from "react";
import { useTheme } from "../contexts/theme/theme-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toDark, toLight, toSystem } from "../features/thema/thema-slice";

const ToggleThemeComponent: React.FC = () => {
    const { theme, setTheme } = useTheme();
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
        <div className='p-5 flex flex-col justify-center'
            onClick={toggleTheme}
        >
            <h1 className='p-5 border-2 transition ease-in-out delay-75 hover:bg-secondary-bg hover:text-main-col hover:scale-110 uppercase'> {theme} </h1>
            <span className="text-center">
                {`click to switch to ${getNextThemeName()}`}
            </span>
        </div>
    );

};


export default ToggleThemeComponent;