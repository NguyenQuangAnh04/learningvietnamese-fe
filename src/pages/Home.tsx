import { faBook, faChartLine, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
const Home: React.FC = () => {
    const navigate = useNavigate();
     useEffect(() => {
    document.title = "Learning Vietnamese with NQA"
  })
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#141f25] ">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col  md:flex-row">
                <div className=" flex-1 flex flex-col justify-center items-center md:items-start px-10 py-16 text-center md:text-left relative overflow-hidden">
            
                    <div className="relative z-10 max-w-2xl">

                        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in">
                            Learn Vietnamese <br /> the Fun Way
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-md mb-10 leading-relaxed" >
                            <TypeAnimation
                                sequence={[
                                    "Welcome to NQA — your ultimate platform to master Vietnamese vocabulary, grammar, and conversation.",
                                    2000, // wait 2 seconds
                                    "",
                                    "Practice with fun lessons, interactive quizzes, and daily challenges!",
                                    2000,
                                    "",
                                ]}
                                speed={50}
                                deletionSpeed={30}
                                wrapper="span"
                                repeat={Infinity}
                            />
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                                <FontAwesomeIcon icon={faBook} className="text-2xl text-blue-400" />
                                <span>Interactive Lessons</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-400" />
                                <span>Daily Quizzes</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-yellow-400" />
                                <span>Track Progress</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center px-6 py-10 relative">
                    <div className="bg-white/2 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-white mb-3">Join NQA</h2>
                            <p className="text-gray-300 mb-8 text-sm">
                                Create an account to access all lessons, quizzes, and progress tracking.
                            </p>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform  hover:shadow-2xl overflow-hidden"
                                >
                                    <span className="relative z-10">Sign Up</span>
                                </button>

                                <button
                                    onClick={() => navigate("/login")}
                                    className="group relative border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform  backdrop-blur-sm"
                                >
                                    I already have an account
                                </button>
                            </div>


                            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                                By continuing, you agree to our{" "}
                                <a href="/terms" className="text-blue-400 hover:text-blue-300 hover:underline transition">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline transition">
                                    Privacy Policy
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;