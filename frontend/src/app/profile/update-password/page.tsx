'use client';

import Password from "@/components/form/Password";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";
import { useState } from "react";
import api from "../../../../lib/axios";
import Loader from "@/components/common/Loader";

const Profile = () => {
    const [password, setPassword] = useState<string>("");
    const [validPassword, setValidPassword] = useState<boolean>(true);
    const [passwordError, setPasswordError] = useState<string>("");

    const [newPassword, setNewPassword] = useState<string>("");
    const [validNewPassword, setValidNewPassword] = useState<boolean>(true);
    const [newPasswordError, setNewPasswordError] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [showLoader, setShowLoader] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.trim() == "") {
            setValidPassword(false);
            setPasswordError("Current password is required");
        } else {
            setValidPassword(true);
            setPasswordError("");
        }

        if (newPassword.trim() == "") {
            setValidNewPassword(false);
            setNewPasswordError("New password is required");
        } else {
            setValidNewPassword(true);
            setNewPasswordError("");
        }

        if (confirmPassword.trim() == "") {
            setValidConfirmPassword(false);
            setConfirmPasswordError("Confirm password is required");
        } else if (confirmPassword !== newPassword) {
            setValidConfirmPassword(false);
            setConfirmPasswordError("Passwords do not match");
        } else {
            setValidConfirmPassword(true);
            setConfirmPasswordError("");
        }

        if (validPassword && validNewPassword && validConfirmPassword) {
            // Call API to update password
            await handleUpdatePassword();
        }
    };

    const handleUpdatePassword = async () => {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            setShowLoader(true);

            const res = await api.post('/profile/update-password', {
                current_password: password,
                new_password: newPassword,
                confirm_new_password: confirmPassword
            });
            
            console.log(res);

            const data = res.data;
            if (data.success) {
                setSuccessMessage(data.message);
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setValidPassword(true);
                setValidNewPassword(true);
                setValidConfirmPassword(true);

                setPasswordError("");
                setNewPasswordError("");
                setConfirmPasswordError("");


                setTimeout(() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                }, 5000);

            }
            setShowLoader(false);
        } catch (error:any) {
            console.error("Error updating password:", error);
            if (error.status && error.status === 422) {
                const errors = error.response.data.errors;
                if (errors.current_password) {
                    setValidPassword(false);
                    setPasswordError(errors.current_password[0]);
                }
                if (errors.new_password) {
                    setValidNewPassword(false);
                    setNewPasswordError(errors.new_password[0]);
                }
                if (errors.confirm_new_password) {
                    setValidConfirmPassword(false);
                    setConfirmPasswordError(errors.confirm_new_password[0]);
                }
            }

            setShowLoader(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-transparent ">
            <div className="flex flex-row justify-between  gap-20 ">
                <h1 className="text-2xl font-bold mb-4">Update Password</h1>
                
                <div className="text-right">
                    <Link href="/dashboard" className="px-2 text-blue-500 hover:underline">
                        Dashboard
                    </Link> /
                    <Link href="/dashboard/profile" className="px-2 text-blue-500 hover:underline">
                        Profile
                    </Link> /
                    <span className="px-2">Update Password</span>
                </div>
            </div>

            <div className="w-102 h-full mx-auto p-4 rounded-md bg-white mt-20">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Password value={password} onChange={(e) => {setPassword(e.target.value)}} isValid={validPassword} />
                        {!validPassword && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <div className="mb-4">
                        <Password label="New Password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} isValid={validNewPassword} />
                        {!validNewPassword && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
                    </div>
                    <div className="mb-4">
                        <Password label="Confirm New Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} isValid={validConfirmPassword} />
                        {!validConfirmPassword && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                    </div>

                    <div className="">
                        <SubmitButton label="Update Password" />
                    </div>
                </form>
                { successMessage && 
                (<div className="block mt-4">
                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Success!</span> {successMessage}
                        </div>
                    </div>
                </div>) }
            </div>

            {showLoader && <Loader />}
        </div>
    );
};

export default Profile;
