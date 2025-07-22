import { useState } from "react";
import { FaLock } from "react-icons/fa";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Password = ( {
    value, 
    onChange 
} : Props
) => {
    const [valid, setValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    return (
        <div className="relative ">
            <FaLock className="absolute left-2 top-0 h-full" />
            <input 
                type="password" 
                value={value} 
                onChange={onChange} 
                placeholder="Password"
                className={`w-full border ${valid ? 'border-gray-300' : 'border-red-500'} rounded-md pl-8 pr-5 pt-2 pb-2`} />
        </div>
    );
}

export default Password;