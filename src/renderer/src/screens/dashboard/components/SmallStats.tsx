import React from 'react'
import SmallStatCards from './SmallStatCards'

const SmallStats:React.FC = () => {
  return (
    <div className='flex w-[80vw] flex-wrap lg:gap-12 gap-2 overflow-x-scroll hide-scb'>
    <SmallStatCards
    title='Total Sales'
    value={100}
    stat='up'
    percentage={10}
    />
   
    <SmallStatCards
    title='Total Purchases'
    value={100}
    stat='down'
    percentage={10}
    />
   
    <SmallStatCards
    title='Total Installments'
    value={500}
    stat='neutral'
    percentage={10}
    />
   
   
   
    </div>
  )
}

export default SmallStats