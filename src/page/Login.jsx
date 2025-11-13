import React, { useEffect, useState } from "react";
import { RiGovernmentLine } from "react-icons/ri";
import { MdOutlineLock } from "react-icons/md";
import { IoCallOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLoginStore from "../store/loginStore";

function Login() {
  const navigate = useNavigate();
  const {
    mobileno,
    passwd,
    loading,
    error,
    setMobileNo,
    setPassword,
    loginRequest,
  } = useLoginStore();

  const [showPassword, setShowPassword] = useState(false);

  // ✅ If already logged in, redirect to dashboard (/home)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginRequest(navigate);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bg-[#E9F0FF] w-full min-h-screen py-[35px]">
      <div className="w-[450px] bg-white mx-auto py-[40px] rounded-2xl px-[30px] shadow-lg">
        <div className="flex flex-col items-center">
          <p className="text-white bg-[#4f46e5] p-5 text-[30px] font-semibold rounded-full">
            <RiGovernmentLine />
          </p>
          <p className="font-bold text-[25px] text-center mt-[15px]">
            Happy Village
          </p>
          <p>Sign in to manage your panchayat data</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-[30px]">
          <label className="font-semibold">Mobile Number</label>
          <div className="flex gap-[10px] items-center border py-[10px] rounded-[8px] px-[10px] mt-[10px] mb-[25px] focus-within:ring-2 focus-within:ring-indigo-500">
            <IoCallOutline />
            <input
              className="flex-1 outline-none"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>

          <label className="font-semibold">Password</label>
          <div className="flex gap-[10px] items-center border py-[10px] rounded-[8px] px-[10px] mt-[10px] focus-within:ring-2 focus-within:ring-indigo-500">
            <MdOutlineLock />
            <input
              className="flex-1 outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={passwd}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>

          <a className="text-[#4f46e5] flex justify-end mt-[30px]" href="#">
            Forgot password?
          </a>

          <button
            className="bg-[#4f46e5] text-white font-semibold w-full py-[10px] rounded-[8px] mt-[30px] disabled:bg-indigo-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>

        <p className="text-center mt-[30px]">
          Need help? Contact your system administrator
        </p>
      </div>
    </div>
  );
}

export default Login;
