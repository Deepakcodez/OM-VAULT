import { useInstallmentStore } from '@renderer/state_manager/installmentPageStore'
import React from 'react'
import PageSwitcher from './PageSwitcher'

const InstallmentsData: React.FC = () => {
  const { activeSection, setActiveSection } = useInstallmentStore()
  return (
    <div className='select-none'>
      <PageSwitcher />
      {activeSection === 'purchase' && <div>purchase</div>}
      {activeSection === 'sale' && <div>sale</div>}
    </div>
  )
}

export default InstallmentsData
