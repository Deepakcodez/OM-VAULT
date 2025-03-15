import React from 'react'
import { Heading } from '@renderer/components/ui'
import InstallmentsData from './components/InstallmentsData'

const Installments:React.FC = () => {
  return (
    <div className='text-white text-2xl relative'>
      <Heading title='Installments' />
       <InstallmentsData/>
    </div>
  )
}

export default Installments
