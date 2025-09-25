import {
  faArrowLeft,
  faCalendar,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserDTO } from '../types/User';

export default function Signup() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState<UserDTO>({
    id: 0,
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    avatar: "",
    bio: "",
    birthdate: "",
    createdAt: "",
    updatedAt: "",
    location: "",
    language: "",
    gender: "",
    newPassword: "",
    roleName: ""
  });

  const handleInputChange = (field: keyof UserDTO, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  };

  const handleSignup = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/register", formData);
      console.log("Signup success:", res.data);
      navigate("/login");
    } catch (error: any) {
      console.error("Signup failed:", error.response.message);
      toast.error("Signup failed:", error.data?.response?.message);

    }
  };
  const inputWrap = 'relative';
  const inputBase =
    'w-full bg-[#202f36] text-white placeholder:text-[#c8e2e3]/70 rounded-xl border border-white/10 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 px-10 py-3 transition';
  const labelBase = 'text-sm text-[#c8e2e3]/80 mb-1 block';

  return (
    <div className="bg-[#141f25] min-h-screen">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white transition"
          aria-label="Go back"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <Link
          to="/login"
          className="text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl shadow-lg transition"
        >
          LOGIN
        </Link>
      </div>

      <div className="flex items-center justify-center px-4 pb-10">
        <div className="max-w-[480px] w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-center text-white font-semibold text-xl">Create your profile</h2>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div>
                <label className={labelBase}>Name</label>
                <div className={inputWrap}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    type="text"
                    placeholder="Your name"
                    className={inputBase}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelBase}>Email</label>
                <div className={inputWrap}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                    className={inputBase}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelBase}>Password</label>
                <div className={inputWrap}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    type={showPwd ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    className={inputBase}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c8e2e3] hover:text-white"
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div>
                <label className={labelBase}>Phone</label>
                <div className={inputWrap}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    type="text"
                    placeholder="Your phone number"
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label className={labelBase}>Birthday</label>
                <div className={inputWrap}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">
                    <FontAwesomeIcon icon={faCalendar} />
                  </span>
                  <input
                    value={formData.birthdate}
                    onChange={(e) => handleInputChange("birthdate", e.target.value)}
                    type="date"
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label className={labelBase}>Gender</label>
                <div className={inputWrap}>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className={`${inputBase} appearance-none pr-10`}
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALW">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#c8e2e3]">▼</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-10 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl py-3 transition shadow-lg"
              >
                Create Account
              </button>

              <button
                type="button"
                className="flex my-5 items-center justify-center gap-3 border border-gray-500 w-full bg-[#202f36] text-white font-medium py-3 rounded-xl "
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
