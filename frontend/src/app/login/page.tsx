'use client';

import Password from "@/components/form/Password";
import SubmitButton from "@/components/form/SubmitButton";
import UserName from "@/components/form/UserName";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const router = useRouter();

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [validUserName, setValidUserName] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);

    const [usernameError, setUserNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        handleLogin();
    }

    const handleLogin = () => {
        if (validUserName && validPassword) {
            // handle Login from here...

            // redirect to dashboard page
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        if (username.trim().length == 0) {
            setValidUserName(false);
            setUserNameError("Username is required");
        } else {
            setValidUserName(true);
            setUserNameError("");
        }
    }, [username]);

    useEffect(() => {
        if (password.trim().length == 0) {
            setValidPassword(false);
            setPasswordError("Password is required");
        } else {
            setValidPassword(true);
            setPasswordError("");
        }
    }, [password]);

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
            </div>
        </div>
    )
}

export default Login;