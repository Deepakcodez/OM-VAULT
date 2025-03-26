import React from 'react'
import { TfiStatsUp } from "react-icons/tfi";
import { TfiStatsDown } from "react-icons/tfi";
import { CgArrowLongRightL } from "react-icons/cg";

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
          <span className={`${stat == 'up' ? 'text-green-500' : stat =='down'? 'text-red-500':'text-blue-500'} `}>
            {stat == 'up' ? ' +' : stat=='down'? ' -':" "}{percentage}
          </span>
        </h1>
      </div>
      <div className={`relative flex justify-center items-center lg:w-24 w-20 rounded-2xl bg-gradient-to-t ${stat == 'up' ? 'from-green-300/10' : stat=='down'? 'from-red-300/10':'from-blue-300/10'}`}>
        {
          stat == 'up' ?
            <>
              <TfiStatsUp size={40} className='text-green-500' />
              <TfiStatsUp size={45} className='text-green-500 blur absolute ' />
            </> :
            stat == 'down'?
            <>
              <TfiStatsDown size={40} className='text-red-500' />
              <TfiStatsDown size={45} className='text-red-500 blur absolute ' />
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