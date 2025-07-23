import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean;
};

const UserName = ( {
    value, 
    onChange,
    isValid
} : Props
) => {

    return (
        <div className="relative ">
            <FaEnvelope className="absolute left-2 top-0 h-full" />
            <input 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="Username"
                className={`w-full border ${isValid ? 'border-gray-300' : 'border-red-500'} rounded-md pl-8 pr-5 pt-2 pb-2`} />
        </div>
    );
}

export default UserName;