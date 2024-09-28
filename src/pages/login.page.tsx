import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PalitraComponent from "../components/palitra/palitra.component";
import CameraSpinner from "../components/camera-spinner/camera-spinner.component";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import { useLocale, translate } from "../contexts/locale";
import { ApiClient } from "../networking/api/api-client";
import { AuthClient } from "../networking";
import { ILoginResponse } from "../interfaces/login-response.interface";

const LoginPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { welcome,
        doNotHaveAccount,
        createForFree,
        orSignUpWith,
        gallery,
        email: emailTitle,
        password: passwordTitle,
        pleaseFillYour,
        login: loginTitle } = translate[locale];

    document.title = `${loginTitle} | ${gallery} | React`;

    const errorTimeout = useRef<NodeJS.Timeout | null>(null);

    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickCreateAccount = () => {
        navigate('/register');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === '') {
            setError(`${pleaseFillYour} ${emailTitle}!`);
            return;
        }

        if (password === '') {
            setError(`${pleaseFillYour} ${passwordTitle}!`);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            AuthClient.post<ILoginResponse>('/auth/login', { email, password })
                .then((response) => {
                    if (response && response.accessToken && response.refreshToken) {
                        dispatch(login([response.accessToken, response.refreshToken]));
                        navigate('/');
                    }
                    else {
                        setError('Login failed');
                    }
                }).catch((error: Error) => {
                    toast.error(error.message, { toastId: 'login' });
                    setError(error.message);
                    setIsLoading(false);
                }).finally(() => {
                    setIsLoading(false);
                });

        }, 0);
    };

    useEffect(() => {
        if (errorTimeout.current)
            clearTimeout(errorTimeout.current);

        if (error)
            errorTimeout.current = setTimeout(() => {
                setError(null);
            }, 3000);

    }, [error, errorTimeout]);

    return (
        <div className="flex w-full h-full flex-row justify-center items-center">
            <div className="hidden md:block w-2/3 h-full  bg-main-bg-75">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="p-3 text-secondary-col text-shadow-xl font-bold uppercase">{welcome}!</h1>
                    <PalitraComponent size="medium" />
                </div>
            </div>

            <div className="w-full md:w-1/3 h-full bg-secondary-bg-75">
                <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
                    <div className="flex md:hidden">
                        <PalitraComponent size="mini" />
                    </div>
                    {!error &&
                        <h1 className="md:hidden text-secondary-col text-shadow-xl font-bold uppercase">{welcome}!</h1>
                    }
                    {error && <p className="bg-danger-bg text-center text-danger-cl w-full p-1">{error}</p>}
                    {isLoading
                        ?
                        <CameraSpinner size="mini" />
                        :
                        <form
                            onSubmit={handleSubmit}
                            className='w-full flex flex-col gap-2 justify-center items-center' action="">
                            <input type="email"
                                placeholder={emailTitle}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 w-2/3 shadow-md rounded-lg bg-main-bg text-main-col text-xs" />

                            <input type="password"
                                placeholder={passwordTitle}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 w-2/3 shadow-md rounded-lg bg-main-bg text-main-col text-xs" />
                            <button className="w-2/3 p-3 bg-primary-bg rounded-lg shadow-md active:scale-95 hover:scale-103" >{loginTitle}</button>
                        </form>
                    }

                    {!isLoading && <div className="p-1 w-full flex flex-col justify-center items-center">
                        <hr className="p-1 w-2/3 border-t-2 border-main-bg-75 my-2" />
                        <span className="p-1 text-sm">
                            {orSignUpWith} <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    toast.info('This feature is not available yet 😵‍💫', { toastId: 'unavailable' });
                                }}
                                className="p-1 cursor hover:bg-secondary-bg text-secondary-col" href="">Google</a>
                        </span>
                        <hr className="p-1 w-2/3 border-t-2 border-main-bg-75 my-2" />
                        <span className="p-1 text-sm">
                            {doNotHaveAccount} <br /><a
                                onClick={handleClickCreateAccount}
                                className="p-1 cursor hover:bg-secondary-bg text-main-col">{createForFree}</a>
                        </span>
                    </div>}

                </div>
            </div>
        </div>
    );
};


export default LoginPage;