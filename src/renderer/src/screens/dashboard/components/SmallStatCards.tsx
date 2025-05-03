import React from 'react'
import { CgArrowLongRightL } from "react-icons/cg";
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

type SmallStatCardsProps = {
  title: string;
  value: number;
  stat: 'up' | 'down' | 'neutral';
  percentage?: number;
}
const SmallStatCards: React.FC<SmallStatCardsProps> = ({ title, value, stat, percentage }) => {
  return (
    <div className='flex gap-2 border border-t-neutral-500 border-neutral-700 rounded-2xl p-4 w-fit bg-gradient-to-b from-neutral-700/50 select-none '>
      <div>
        <h1 className='text-7xl text text-neutral-700 font-semibold'>{value}</h1>
        <h1 className='text-sm'>{title}
          <span className={`${stat == 'up' ? 'text-green-500' : stat =='down'? 'text-green-500':'text-blue-500'} `}>
          </span>
        </h1>
      </div>
      <div className={`relative flex justify-center items-center lg:w-24 w-20 rounded-2xl bg-gradient-to-t ${stat == 'up' ? 'from-green-300/10' : stat=='down'? 'from-green-300/10':'from-blue-300/10'}`}>
        {
          stat == 'up' ?
            <>
              <GiReceiveMoney size={40} className='text-green-500' />
              <GiReceiveMoney  size={45} className='text-green-500 blur absolute ' />
            </> :
            stat == 'down'?
            <>
              <GiPayMoney size={40} className='text-green-500' />
              <GiPayMoney size={45} className='text-green-500 blur absolute ' />
            </> :
            <>
            <CgArrowLongRightL size={40} className='text-blue-500' />
            <CgArrowLongRightL size={45} className='text-blue-500 blur absolute' />
            </>
        }

      </div>
    </div>
  )
}

export default SmallStatCards
