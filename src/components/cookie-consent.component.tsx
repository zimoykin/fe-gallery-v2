import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { translate, useLocale } from "../contexts/locale";
import ToggleThemeComponent from "./toggle-theme.component";

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { locale, toggleLocale } = useLocale();
    const {
        weAcceptCookies,
        accept,
        cookiePolicy,
        decline
    } = translate[locale];

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'true', { expires: 365 });
        setIsVisible(false);
    };

    useEffect(() => {
        const consent = Cookies.get('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    return isVisible ? (
        <div className="fixed bg-gray-600 bg-opacity-60 w-full h-full top-0 left-0 z-[998]">
            <div className="w-full h-full md:p-10 flex justify-center items-center">
                <div className="relative w-full h-1/3 rounded-md shadow-xl md:w-3/5 p-10 
                bg-main-bg text-main-col
                 flex flex-col justify-center items-center z-[999]">
                    <div className="absolute top-3 right-3 flex">
                        <div
                            onClick={toggleLocale}
                            className={`text-shadow-sm p-1 hover:bg-secondary-bg rounded-md hover:scale-110 transition ease-in-out duration-300 `}>
                            <i className="fa-solid fa-flag" />
                            <span className="md:p-1 uppercase hover:bg-secondary-bg rounded-md">
                                {locale}
                            </span>

                        </div>
                        <div className={`text-shadow-sm hover:bg-secondary-bg rounded-md hover:scale-110 transition ease-in-out duration-300 `}>
                            <ToggleThemeComponent />
                        </div>
                    </div>
                    <span className="text-6xl text-shadow-md hover:scale-110
                    transition ease-in-out duration-300 
                    "> 🍪 </span>
                    <p className="text-md p-2 text-primary-cl">{weAcceptCookies} <a href="#" className="underline">{cookiePolicy ?? 'Cookie Policy'}</a>.</p>

                    <div className="gap-2 flex py-4">
                        <button
                            onClick={handleAccept}
                            className="bg-secondary-bg text-main-col px-4 py-4 shadow-md rounded hover:bg-primary-bg transition ease-in-out duration-300 hover:scale-105"
                        >
                            {accept}
                        </button>
                        <button
                            className="bg-secondary-bg text-main-col px-4 py-4 shadow-md rounded hover:bg-danger-bg transition ease-in-out duration-300 hover:scale-105"
                        >
                            {decline}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    ) : null;
};

export default CookieConsent;;;