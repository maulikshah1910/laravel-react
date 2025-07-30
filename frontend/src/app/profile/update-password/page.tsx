'use client';

import Password from "@/components/form/Password";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";
import { useState } from "react";
import api from "../../../../lib/axios";

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

            const res = await api.post('/profile/update-password', {
                current_password: password,
                new_password: newPassword,
                confirm_new_password: confirmPassword
            });
            
            console.log(res);

        } catch (error) {
            console.error("Error updating password:", error);
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
            </div>

        </div>
    );
};

export default Profile;
