import React from "react";
import Logo from "../assets/images/omvault_logo.webp";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { YearDropdown } from "./ui";

type sidebarOptionsTypes = {
  name: string;
  screen: string;
};
const Sidebar: React.FC = () => {
  const location = useLocation();
  const sidebarOptions: sidebarOptionsTypes[] = [
    {
      name: "Dashboard",
      screen: "/dashboard",
    },
    {
      name: "Sale ",
      screen: "/sale",
    },
    {
      name: "Transactions",
      screen: "/transactions",
    },
    {
      name: "Installments",
      screen: "/installments",
    },
    {
      name: "Purchase",
      screen: "/purchase",
    },

  ];
  return (
    <motion.div className="md:w-[12rem] w-[8rem] h-full text-sm text-white bg-neutral-800 p-4 border-r border-r-zinc-800 overflow-hidden select-none">
      <img src={Logo} alt="OM VAULT" className=" mx-auto opacity-80" />
      <div className="mt-12 h-[80%] w-full  overflow-y-scroll hide-scb  ">
        <div className="w-full bg-zinc-800 pe-2 rounded">
          <YearDropdown />
        </div>
        {sidebarOptions.map((option) => (
          <Link
            to={option.screen}
            key={option.name}
            className={`p-2 hover:bg-neutral-600/20 cursor-pointer mt-2 rounded-md flex select-none ${
              location.pathname === option.screen ? "bg-neutral-700 " : ""
            }`}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
