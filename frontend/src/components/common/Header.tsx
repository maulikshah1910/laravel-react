import Image from "next/image";
import { useState } from "react";
import ProfileNav from "./ProfileNav";
import Link from "next/link";


const Header = () => {
    const userName = "Maulik";
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="p-3 bg-red-500 text-white flex items-center justify-between ">
            <div className="flex items-center space-x-2">
                <Link href="/dashboard" className="text-white font-bold text-lg">
                    <Image src="/ai-logo.webp" alt="" width={100} height={100} className="w-10 h-10 rounded-full" />
                </Link>
            </div>

            <div className="relative" >
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex cursor-pointer hover:underline items-center space-x-2 bg-transparent text-white  rounded-md focus:outline-none"
                >
                    <span className="text-sm font-medium ">{userName}</span>
                    <svg
                        className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                { menuOpen && <ProfileNav /> }
            </div>
        </header>
    )
};

export default Header;