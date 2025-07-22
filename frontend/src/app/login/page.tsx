'use client';

import Password from "@/components/form/Password";
import SubmitButton from "@/components/form/SubmitButton";
import UserName from "@/components/form/UserName";
import { useState } from "react";

const Login = () => {
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [userNameInvalid, setUserNameInvalid] = useState<boolean>(false);
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

    const [usernameError, setUserNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(username, password);

        if (username.trim() == "") {
            setUserNameInvalid(true);
            setUserNameError("Username is required");
        } else {
            setUserNameInvalid(false);
            setUserNameError("");
        }
        
        if (password.trim() == "") {
            setPasswordInvalid(true);
            setPasswordError("Password is required");
        } else {
            setPasswordInvalid(false);
            setPasswordError("");
        }
    }

    return (
        <div className="w-full h-screen v-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-md w-102">
                <h1 className="text-center font-bold text-xl mb-4">Sign In to the System</h1>

                <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="">
                        <UserName value={username} onChange={(e) => {setUserName(e.target.value)}} />
                        {userNameInvalid && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    </div>
                    <div className="">
                        <Password value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        {passwordInvalid && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
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