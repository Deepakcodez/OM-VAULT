import React from 'react'
import PageSwitcher from './components/PageSwitcher'
import { Heading } from '@renderer/components/ui'
import InstallmentsData from './components/InstallmentsData'
import { useInstallmentStore } from '@renderer/state_manager/installmentPageStore'

const Installments:React.FC = () => {
  return (
    <div className='text-white text-2xl'>
      <Heading title='Installments' />
       <InstallmentsData/>
    </div>
  )
}

export default Installments
