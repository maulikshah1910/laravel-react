'use client';

import Password from "@/components/form/Password";
import SubmitButton from "@/components/form/SubmitButton";
import UserName from "@/components/form/UserName";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";

const Login = () => {
    const router = useRouter();

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [validUserName, setValidUserName] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);

    const [usernameError, setUserNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim() == "") {
            setValidUserName(false);
            setUserNameError("Username is required");
        } else {
            setValidUserName(true);
            setUserNameError("");
        }
        
        if (password.trim() == "") {
            setValidPassword(false);
            setPasswordError("Password is required");
        } else {
            setValidPassword(true);
            setPasswordError("");
        }

        if (validUserName && validPassword) {
            await handleLogin();
        }
    }

    const handleLogin = async () => {
        try {
            setErrorMessage("");

            const res = await api.post('/login', {
                username: username,
                password: password
            });
            console.log(res);
            
            if (!res.data.success) {
                setErrorMessage(res.data.message);
                setUserName('');
                setPassword('');
            }

            const token = res.data.token;
            localStorage.setItem('token', token);

            // redirect to dashboard page
            router.push('/dashboard');
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            setPassword('');
        }

    }

    useEffect(() => {
        if (username.trim().length == 0) {
            setValidUserName(false);
            // setUserNameError("Username is required");
            setUserNameError("");
        } else {
            setValidUserName(true);
            setUserNameError("");
        }
    }, [username]);

    useEffect(() => {
        if (password.trim().length == 0) {
            setValidPassword(false);
            // setPasswordError("Password is required");
            setPasswordError("");
        } else {
            setValidPassword(true);
            setPasswordError("");
        }
    }, [password]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    });

    return (
        <div className="w-full h-screen v-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-md w-102">
                <h1 className="text-center font-bold text-xl mb-4">Sign In to the System</h1>

                <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="">
                        <UserName value={username} onChange={(e) => {setUserName(e.target.value)}} isValid={validUserName} />
                        {!validUserName && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    </div>
                    <div className="">
                        <Password value={password} onChange={(e) => {setPassword(e.target.value)}} isValid={validPassword} />
                        {!validPassword && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <div className="">
                        <SubmitButton />
                    </div>
                </form>

                { errorMessage && 
                (<div className="block mt-4">
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Error!</span> {errorMessage}
                        </div>
                    </div>
                </div>) }

            </div>
        </div>
    )
}

export default Login;