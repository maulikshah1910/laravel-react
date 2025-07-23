import Image from "next/image";
import Link from "next/link";
import { FaCog, FaHome, FaLock, FaFileImport } from "react-icons/fa";


const Sidebar = () => {
    const navItems = [
        {
            label: "Home",
            icon: <FaHome />,
            href: "/dashboard"
        },
        {
            label: "Files",
            icon: <FaFileImport />,
            href: "/dashboard/files"
        }
    ];


    return (
        <aside className="w-64 h-screen bg-white border-r shadow-sm p-0 flex flex-col">
            <div className="flex items-center space-x-3 mb-8 p-4">
                <Link className="flex items-center space-x-4" href="/dashboard/profile">
                <Image
                    src="/ai-logo.webp"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    width={40}
                    height={40}
                />
                <div>
                    <p className="text-gray-800 font-semibold">Maulik</p>
                </div>
                </Link>
            </div>

            <nav className="flex flex-col space-y-2.5">
                { navItems.map ((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 py-4 rounded-md transition-colors"
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;