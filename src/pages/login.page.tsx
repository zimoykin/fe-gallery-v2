import React, { useState } from "react";
import { toast } from "react-toastify";
import PalitraComponent from "../components/palitra/palitra.component";

const LoginPage: React.FC = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast.info('Login...');
    };

    return (
        <div className="flex w-full h-full flex-row justify-center items-center">
            <div className="hidden md:block w-2/3 h-full  bg-main-bg-75">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-secondary-col font-bold">WELCOME!</h1>
                    <PalitraComponent />
                </div>
            </div>

            <div className="w-full md:w-1/3 h-full bg-secondary-bg-75">
                <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
                    <h1 className="md:hidden text-secondary-col font-bold">WELCOME!</h1>
                    <form
                        onSubmit={handleSubmit}
                        className='w-full flex flex-col gap-1 justify-center items-center' action="">
                        <input type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 w-2/3 rounded-lg bg-main-bg text-main-col" />

                        <input type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 w-2/3 rounded-lg bg-main-bg text-main-col" />
                        <button className="w-2/3 p-3 bg-primary-bg rounded-lg" >Login</button>
                    </form>
                    <br />
                    <span>
                        or sign up with <a
                            onClick={(e) => {
                                e.preventDefault();
                                toast.info('This feature is not available yet 😵‍💫', { toastId: 'unavailable' });
                            }}
                            className="p-1 cursor hover:bg-secondary-bg text-secondary-col" href="">Google</a>
                    </span>
                    <br />
                    <span>
                        Do not have an account? <a className="p-1 cursor hover:bg-secondary-bg text-main-col">Create for free </a>
                    </span>


                </div>
            </div>
        </div>
    );
};


export default LoginPage;