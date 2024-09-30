
import React, { useEffect } from "react";
import { translate, useLocale } from "../contexts/locale";

const UnavailablePage: React.FC = () => {

    const { locale } = useLocale();
    const { pageNotFound } = translate[locale];

    useEffect(() => {
        document.title = `404 - ${pageNotFound} | Gallery | React`;
    }, [locale, pageNotFound]);

    return (
        <div className="flex w-full h-full flex-col justify-center items-center">
            <h1 className="text-secondary-col text-6xl md:text-9xl text-shadow-md font-extrabold">{pageNotFound}</h1>
        </div>
    );
};

export default UnavailablePage;