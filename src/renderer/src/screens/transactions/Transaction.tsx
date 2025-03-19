import React from 'react'
import noDataIcon from "../../assets//images/no-data.webp"
import { Heading } from '@renderer/components/ui'
const Transaction:React.FC = () => {
  return (
    <div  className=' text-white'>
      <Heading title='Transactions'/>
      <div className=' h-[70vh] select-none flex justify-center items-center'>
      <img src={noDataIcon} className='h-[22rem]'/>
      </div>
    </div>
  )
}

export default Transaction
