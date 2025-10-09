import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../component/common/LanguageSwitcher";

export default function Login() {
    const [value, setValue] = useState("");
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/login", {
                email, password
            }, { withCredentials: true });
            localStorage.setItem("access_token", res.data.access_token);
            navigate('/')

        } catch (err) {
            console.error("Kiểm tra lại tài khoản mật khẩu");
        }
    }
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    })

   return (
        <div className="bg-[#141f25] min-h-screen">
            <div className="flex justify-between items-center max-w-[1200px] mx-auto p-4">
                <button className="text-gray-500 "><FontAwesomeIcon icon={faX} /></button>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher /> 
                    <button onClick={() => navigate('/signup')} className="border-2 border-gray-500 px-4 py-2 text-white rounded-xl ">
                        {t('SIGN UP')} {/* ✅ Translation */}
                    </button>
                </div>
            </div>
            <div className=" flex items-center justify-center">
                <div className=' max-w-[400px] w-full p-4 rounded-md'>
                    <h2 className="text-center text-white text-xl font-bold mb-4">{t('Log in')}</h2> {/* ✅ Translation */}
                    <form action="" onSubmit={handleLogin} className="flex flex-col space-y-4 mt-5">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='border-2 border-gray-500 rounded-xl focus:ring-0 focus:outline-none px-3 py-2 bg-[#202f36] placeholder:font-semibold placeholder:text-xl placeholder:text-[#c8e2e3] caret-white focus:border-white text-white  w-full' 
                                placeholder={t('Email or username')} 
                            />
                            {value && (
                                <button onClick={() => setValue("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-4 h-4  bg-gray-600 flex items-center justify-center font-semibold">
                                    <FontAwesomeIcon icon={faX} className="text-[10px] " />
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder={t('Password')} 
                                className='border-2 border-gray-500 rounded-xl focus:ring-0 focus:outline-none px-3 py-2 bg-[#202f36] placeholder:font-semibold placeholder:text-xl placeholder:text-[#c8e2e3] caret-white focus:border-white text-white w-full' 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (<FontAwesomeIcon icon={faEyeSlash} />)}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')}
                                className="text-cyan-500 hover:underline  text-sm"
                            >
                                {t('Forgot password?')} {/* ✅ Translation */}
                            </button>
                        </div>
                        <button type="submit" className="bg-[#49C0F8] font-semibold py-4 rounded-xl">
                            {t('LOG IN')} {/* ✅ Translation */}
                        </button>
                        
                        {/* Uncomment if you want to use these sections with translations */}
                        {/* <div className="flex items-center gap-4">
                            <hr className="flex-1 border-gray-600" />
                            <span className="text-gray-400 text-sm">{t('OR')}</span>
                            <hr className="flex-1 border-gray-600" />
                        </div> */}
                        {/* <button
                            type="button"
                            className="flex items-center justify-center gap-3 border border-gray-500 
                                       bg-[#202f36] text-white font-medium py-3 rounded-xl hover:bg-gray-100 transition hover:text-black"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            {t('Continue with Google')}
                        </button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
