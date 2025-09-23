import { faArrowLeft, faBirthdayCake, faBookOpen, faCalendar, faFire, faGamepad, faLocationPin, faPen, faPhone, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../types/User";
import { getInforUser } from "../service/userService";

export default function Profile() {
    const achievement = [
        { title: "Total Score", value: "1,250", icon: faTrophy, color: "text-amber-600 bg-amber-100" },
        { title: "Lessons Completed", value: "15", icon: faBookOpen, color: "text-emerald-600 bg-emerald-100" },
        { title: "Games Played", value: "2", icon: faGamepad, color: "text-indigo-600 bg-indigo-100" },
        { title: "Learning Streak", value: "7 days", icon: faFire, color: "text-red-600 bg-red-100" },
    ];
    const [user, setUser] = useState<UserDTO | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getInforUser();
                setUser(res.data);
            } catch (error: any) {
                console.log(error.message)
            }
        }
        fetchUser()
    }, []);

    const navigate = useNavigate();
    const parts = user && user.fullName.trim().split(/\s+/);
    const first = parts && parts[parts.length - 2]?.charAt(0).toUpperCase() || "";
    const last = parts && parts[parts.length - 1]?.charAt(0).toUpperCase() || "";
    return (
        <div className="bg-[#141f25] min-h-screen text-white py-10">    
            <div className="max-w-[1200px] mx-auto space-y-6 px-4">
                <button onClick={()=> navigate("/")}><FontAwesomeIcon icon={faArrowLeft}/></button>
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <p className=" text-[10px] sm:text-sm text-gray-400">
                            Manage your personal information and preferences
                        </p>
                    </div>
                    <button onClick={() => navigate("/edit-profile")} className="flex items-center gap-[2px] sm:gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-[10px] sm:text-sm transition">
                        <FontAwesomeIcon icon={faPen} />
                        Edit Profile
                    </button>
                </div>

                <div className="w-full border border-gray-700 rounded-xl p-6 shadow-lg bg-white/5">
                    {user && (
                        <div className="max-w-[600px] w-full flex gap-2 sm:gap-6 items-center">
                            {
                                user.avatar !== "Unknow" ? (
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-10 h-10 sm:w-28 sm:h-28 rounded-full border-2 border-cyan-500 shadow-md object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 p-4 sm:w-28 sm:h-28 bg-white text-black rounded-full flex items-center text-[10px] sm:text-2xl justify-center">
                                        {first + last}
                                    </div>
                                )
                            }
                            <div>
                                <h1 className="text-2xl font-semibold">{user.fullName}</h1>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                                <div className="flex gap-4 text-sm text-gray-400 mt-2">
                                    <span>{achievement[0].value} points</span>
                                    <span>Member since Aug 1, 2025</span>
                                </div>
                                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                                    {user.bio}
                                </p>
                                <div className="flex gap-4 text-sm mt-3">
                                    <p className="flex gap-2 items-center text-gray-400">
                                        <FontAwesomeIcon icon={faBirthdayCake} />
                                        {user.birthdate
                                            ? new Date().getFullYear() - parseInt(user.birthdate.split("-")[0], 10)
                                            : "N/A"}
                                    </p>

                                    <p className="flex gap-2 items-center text-gray-400">
                                        <FontAwesomeIcon icon={faLocationPin} />
                                        {user.location}
                                    </p>
                                    <p className="flex gap-2 items-center text-gray-400">
                                        <FontAwesomeIcon icon={faPhone} />
                                        {user.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievement.map((item, index) => (
                        <div
                            className="border border-gray-700 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
                            key={index}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color}`}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </span>
                                <p className="text-sm text-gray-300">{item.title}</p>
                            </div>
                            <p className="font-bold text-xl pl-12 mt-1">{item.value}</p>
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="border border-gray-700 rounded-xl p-5 bg-white/5">
                        <p className="flex gap-2 items-center mb-2 text-lg font-medium">
                            <FontAwesomeIcon icon={faUser} />
                            Basic Information
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                            Your personal details and contact information
                        </p>
                        <div className="divide-y divide-gray-700 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Full name</span>
                                <span className="font-medium">{user?.fullName}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Email</span>
                                <span className="font-medium">{user?.email}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Phone</span>
                                <span className="font-medium">{user?.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Location</span>
                                <span className="font-medium">{user?.location}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-400">Bio</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{user?.bio}</p>
                        </div>
                    </section>

                    <section className="border border-gray-700 rounded-xl p-5 bg-white/5">
                        <p className="flex gap-2 items-center mb-2 text-lg font-medium">
                            <FontAwesomeIcon icon={faCalendar} />
                            Personal Details
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                            Additional personal information
                        </p>
                        <div className="divide-y divide-gray-700 text-sm">
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Sex</span>
                                <span className="font-medium">{user?.gender}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Birthday</span>
                                <span className="font-medium">{user?.birthdate}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Native language</span>
                                <span className="font-medium">{user?.language}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Member since</span>
                                <span className="font-medium">{user?.createdAt}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

}
