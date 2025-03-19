import React from 'react'
import Logo from '../assets/images/omvault_logo.webp'
import { motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { YearDropdown } from './ui'
import { TbLayoutDashboard } from 'react-icons/tb'
import { GiReceiveMoney } from 'react-icons/gi'
import { GiPayMoney } from 'react-icons/gi'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { GrMoney } from 'react-icons/gr'
import { IconType } from 'react-icons/lib'

type sidebarOptionsTypes = {
  name: string
  screen: string
  icon: IconType
}
const Sidebar: React.FC = () => {
  const location = useLocation()
  const sidebarOptions: sidebarOptionsTypes[] = [
    {
      name: 'Dashboard',
      screen: '/dashboard',
      icon: TbLayoutDashboard
    },
    {
      name: 'Sale ',
      screen: '/sale',
      icon: GiReceiveMoney
    },
    {
      name: 'Purchase',
      screen: '/purchase',
      icon: GiPayMoney
    },
    {
      name: 'Installments',
      screen: '/installments',
      icon: GrMoney
    },
    {
      name: 'Transactions',
      screen: '/transactions',
      icon: FaMoneyBillTransfer
    },
  ]
  return (
    <motion.div className="md:w-[12rem] w-[8rem] h-full text-sm text-white bg-neutral-800 p-4 border-r border-r-zinc-700/50 overflow-hidden select-none ">
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
              location.pathname === option.screen ? 'bg-neutral-700 ' : ''
            }`}
          >
            <option.icon
              className={` text-lg mr-2 ${location.pathname === option.screen ? 'text-violet-200' : 'text-neutral-400'} `}
            />
           <p className=''> {option.name} </p>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default Sidebar
