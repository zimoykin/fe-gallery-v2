import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PalitraComponent from '../components/palitra/palitra.component';
import CameraSpinner from '../components/camera-spinner/camera-spinner.component';
import { validateEmail, validatePassword } from '../helpers/input-validate.helper';
import { toast } from 'react-toastify';
import { useLocale } from '../contexts/locale';
import trnsl from '../contexts/locale/locale';

const RegisterPage: React.FC = () => {

    const navigate = useNavigate();
    const { locale } = useLocale();
    const {
        niceToMeetYou, email: emailTitle,
        password: passwordTitle,
        register,
        name: nameTitle,
        confirmPassword: confirmPasswordTitle,
        pleaseFillYour,
        pleaseProvideValid,
        pleaseConfirmPassword,
        passwordsDoNotMatch,
        passwordRequirements, weWillSendEmail
    } = trnsl[locale];

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<string | null>(null);

    const errorTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (errorTimeout.current)
            clearTimeout(errorTimeout.current);
        if (error) {
            errorTimeout.current = setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }, [error, errorTimeout]);

    const handleRegisterClick = () => {
        setIsLoading(true);

        if (name === '') {
            setError(`${pleaseFillYour} ${nameTitle}!`);
            setIsLoading(false);
            return;
        }
        if (email === '') {
            setError(`${pleaseFillYour} ${emailTitle}!`);
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError(`${pleaseProvideValid} ${emailTitle}!`);
            setIsLoading(false);
            return;
        }

        if (password === '') {
            setError(`${pleaseFillYour} ${passwordTitle}!`);
            setIsLoading(false);
            return;
        }

        if (confirmPassword === '') {
            setError(`${pleaseConfirmPassword}`);
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError(`${passwordsDoNotMatch}`);
            setIsLoading(false);
            return;
        }
        if (!validatePassword(password)) {
            setError(`${passwordRequirements}`);
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            toast.info(`${weWillSendEmail} ✉️`, { toastId: 'register' });
            //TODO: implement register logic
            navigate('/');
        }, 4000);

    };


    return (<>
        <div className='flex flex-col justify-start items-center h-full w-full overflow-auto'>

            <div className='p-2 text-center bg-secondary-bg md:bg-transparent'>
                <h1 className='text-secondary-col text-shadow-md md:text-6xl text-4xl font-bold'> {niceToMeetYou}! </h1>
            </div>

            <div className='p-5 hidden md:block'>
                <PalitraComponent size='medium' />
            </div>
            <div className='p-1 flex md:hidden'>
                <PalitraComponent size='mini' />
            </div>

            <div className='relative flex flex-col justify-center items-center md:w-3/4 md:h-1/2 h-full w-full bg-secondary-bg-75 shadow-lg rounded-md'>
                {error && <span className='absolute top-0 p-2 text-main-col bg-danger-bg w-full flex justify-center'>{error}</span>}
                {!isLoading && <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className='flex w-full justify-center items-center flex-col gap-2'>
                    <input
                        className='p-2 w-5/6 md:w-3/4 
                        bg-main-bg text-secondary-col text-lg
                        rounded-md shadow-md'
                        type="text" placeholder={nameTitle} value={name} onChange={(e) => setName(e.target.value)} />
                    <input
                        className='p-2 w-5/6 md:w-3/4
                        bg-main-bg text-secondary-col text-lg
                        rounded-md shadow-md'
                        type="email" placeholder={emailTitle} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        className='p-2 w-5/6 md:w-3/4
                        bg-main-bg text-secondary-col text-lg
                        rounded-md shadow-md'
                        type="password" placeholder={passwordTitle} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input
                        className='p-2 w-5/6 md:w-3/4
                        bg-main-bg text-secondary-col text-lg
                        rounded-md shadow-md'
                        type="password" placeholder={confirmPasswordTitle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='p-2 w-5/6 md:w-3/4
                    hover:bg-green-500 hover:scale-101 active:scale-95
                    bg-primary-bg text-primary-col rounded-md' onClick={handleRegisterClick}> <span className='text-2xl font-bold'>{register}</span> </button>
                </form>}

                {isLoading && <CameraSpinner size='small' />}
            </div>
        </div>

    </>);
};
export default RegisterPage;