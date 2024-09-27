import React, { useState } from "react";
import { toast } from "react-toastify";
import PalitraComponent from "../components/palitra/palitra.component";
import CameraSpinner from "../components/camera-spinner/camera-spinner.component";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {

    document.title = 'Login | Gallery | React';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClickCreateAccount = () => {
        navigate('/register');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.error('Please fill in all fields!', { toastId: 'login' });
            return;
        }

        setIsLoading(true);
        //TODO: implement login logic
        setTimeout(() => {
            setIsLoading(false);
            toast.info('unfortunately, this feature is not available! 🤪', { toastId: 'login' });
            dispatch(login(['accessToken', 'refreshToken']));
            navigate('/profile');
        }, 2000);
    };

    return (
        <div className="flex w-full h-full flex-row justify-center items-center">
            <div className="hidden md:block w-2/3 h-full  bg-main-bg-75">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="p-3 text-secondary-col text-shadow-xl font-bold">WELCOME!</h1>
                    <PalitraComponent size="medium" />
                </div>
            </div>

            <div className="w-full md:w-1/3 h-full bg-secondary-bg-75">
                <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
                    <div className="flex md:hidden">
                        <PalitraComponent size="mini" />
                    </div>
                    <h1 className="md:hidden text-secondary-col text-shadow-xl font-bold">WELCOME!</h1>
                    {isLoading
                        ?
                        <CameraSpinner size="mini" />
                        :
                        <form
                            onSubmit={handleSubmit}
                            className='w-full flex flex-col gap-2 justify-center items-center' action="">
                            <input type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 w-2/3 shadow-md rounded-lg bg-main-bg text-main-col" />

                            <input type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 w-2/3 shadow-md rounded-lg bg-main-bg text-main-col" />
                            <button className="w-2/3 p-3 bg-primary-bg rounded-lg shadow-md active:scale-95 hover:scale-103" >Login</button>
                        </form>
                    }

                    {!isLoading && <div className="p-1 w-full flex flex-col justify-center items-center">
                        <hr className="p-1 w-2/3 border-t-2 border-main-bg-75 my-2" />
                        <span className="p-1 text-sm">
                            or sign up with <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    toast.info('This feature is not available yet 😵‍💫', { toastId: 'unavailable' });
                                }}
                                className="p-1 cursor hover:bg-secondary-bg text-secondary-col" href="">Google</a>
                        </span>
                        <hr className="p-1 w-2/3 border-t-2 border-main-bg-75 my-2" />
                        <span className="p-1 text-sm">
                            Do not have an account? <br /><a
                                onClick={handleClickCreateAccount}
                                className="p-1 cursor hover:bg-secondary-bg text-main-col">Create for free </a>
                        </span>
                    </div>}

                </div>
            </div>
        </div>
    );
};


export default LoginPage;