import React from 'react'
import SmallStatCards from './SmallStatCards'
import useTotalPurchase from '@renderer/hooks/useTotalPurchase'
import useTotalSale from '@renderer/hooks/usetTotalSale';

const SmallStats: React.FC = () => {
  const totalPurchase: number = useTotalPurchase();
  const totalSale: number = useTotalSale();
  return (
    <div className='flex w-full  flex-wrap  gap-2  hide-scb'>
      <SmallStatCards
        title='Total Sales'
        value={totalSale}
        stat='up'
        percentage={10}
      />
      <SmallStatCards
        title='Total Purchases'
        value={totalPurchase}
        stat='down'
        percentage={10}
      />
    </div>
  )
}

export default SmallStats