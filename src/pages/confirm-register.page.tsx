import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PalitraComponent from '../components/palitra/palitra.component';
import { toast } from 'react-toastify';
import { useLocale, translate } from '../contexts/locale';
import { AuthClient } from '../networking';
import { IRegister } from '../interfaces/register.inetrface';

const ConfirmRegisterPage: React.FC = () => {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { locale } = useLocale();
    const {
        pleaseFillYour,
        confirm,
        writeYourCodeBelow,
        confirmationCode
    } = translate[locale];

    const [isLoading, setIsLoading] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
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

        if (confirmCode === '') {
            setError(`${pleaseFillYour} ${confirmationCode}!`);
            setIsLoading(false);
            return;
        }
        const token = params.get('token');
        if (token === undefined) {
            setError(`Bad link!`);
            setIsLoading(false);
            return;
        }

        AuthClient.post<IRegister>('/auth/confirm', {
            code: confirmCode,
            token: token
        })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message, { toastId: 'confirm' });
                setError(error.message);
                throw error;
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (<>
        <div className='flex flex-col justify-center items-center h-full w-full overflow-auto'>

            <div className='relative flex flex-col justify-center items-center md:w-3/4 md:h-1/2 h-full w-full bg-highlight-bg-75 shadow-lg rounded-md'>
                {error && <span className='absolute top-0 p-2 text-main-col bg-danger-bg w-full flex justify-center'>{error}</span>}

                <div className='p-4 text-center md:bg-transparent w-full'>
                    <h1 className='text-highlight-cl text-shadow-md md:text-6xl text-4xl font-bold'> {writeYourCodeBelow}! </h1>
                </div>

                {!isLoading && <div
                    className='flex w-full justify-center items-center flex-col gap-2'>
                    <input
                        className='p-4 w-5/6 md:w-3/4 
                        bg-main-bg text-secondary-col text-xs
                        rounded-md shadow-md'
                        type="text" placeholder={confirmationCode} value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} />

                    <button className='p-2 w-5/6 md:w-3/4
                    hover:bg-green-500 hover:scale-101 active:scale-95
                    bg-primary-bg text-primary-col rounded-md' onClick={handleRegisterClick}> <span className='text-2xl font-bold'>{confirm}</span> </button>
                </div>}

                {isLoading && <PalitraComponent size='small' />}
            </div>
        </div>

    </>);
};
export default ConfirmRegisterPage;