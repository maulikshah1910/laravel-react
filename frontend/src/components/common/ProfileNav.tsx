
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfileNav = () => {
    const router = useRouter();

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
            <Link 
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                Profile
            </Link>
            <Link
                href="/profile/update-password"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                Update Password 
            </Link>
            <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => {
                // logout logic goes here
                    console.log('Logging out...');
                    router.push('/login'); // Redirect to login page after logout
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileNav;