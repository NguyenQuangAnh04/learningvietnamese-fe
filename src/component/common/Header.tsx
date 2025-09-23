import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../service/userService";

export default function Header() {
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    }
    return (
        <header className='bg-[#14222a] text-white'>
            <nav className='container mx-auto max-w-[1200px] w-full px-2 py-4 shadow-2xl flex justify-between '>
                <a href="/" className='text-2xl font-bold'>Learn Vietnamese</a>
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#" className="hover:text-blue-200 transition">Home</a>
                    {/* <a href="#" className="hover:text-blue-200 transition">Lessons</a> */}

                    <a href="/profile" className="hover:text-blue-200 transition">Profile</a>
                    <a href="/games" className="hover:text-blue-200 transition">Games</a>
                    {/* <a href="#" className="hover:text-blue-200 transition">Progress</a> */}
                    <button onClick={() => handleLogout()}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">LOG OUT</button>
                </div>
                <button className="md:hidden block">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </nav>
        </header>
    )
}
