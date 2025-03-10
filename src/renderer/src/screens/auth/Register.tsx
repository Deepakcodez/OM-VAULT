import React from "react";
import { Link } from "react-router-dom";
import { registerType } from "../../types/auth.types";

const Register: React.FC = () => {
  const [userData, setUserData] = React.useState<registerType>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

 const handleRegister = async () => {
    await window.electronAPI.onRegisterData(userData);
 }
 
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="relative group border border-gray-300/10 rounded-md px-6 py-12 bg-neutral-800 flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-white/50 text-center">
          Register
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            value={userData.name}
            placeholder="Enter your name"
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            placeholder="Enter your email"
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            value={userData.phone}
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-violet-500 text-white rounded-md p-2 mt-4 hover:bg-violet-600 transition"
        >
          Register
        </button>
        <p className="text-white/50">
          {" "}
          Have an Account ?{" "}
          <Link to={"/"} className="text-violet-400 cursor-pointer">
            {" "}
            Login{" "}
          </Link>
        </p>

        <div className=" absolute bottom-0 left-0   justify-center h-1 w-full items-center gap-1  ">
          <span className="bg-violet-800 w-full h-1  absolute bottom-0 left-0    rounded-b-md"></span>
          <span className="bg-violet-400 w-full h-[2px] group-hover:blur-lg blur-sm right-0 absolute bottom-0 left-0    rounded-b-md"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
