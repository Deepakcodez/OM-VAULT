import { useInstallmentStore } from '@renderer/state_manager/installmentPageStore'
import React from 'react'
import PageSwitcher from './PageSwitcher'
import PurchaseInstallmentData from './PurchaseInstallmentData'
import SalesInstallmentData from './SalesInstallementData'

const InstallmentsData: React.FC = () => {
  const { activeSection } = useInstallmentStore()
  return (
    <div className="select-none flex flex-col gap-10 ">
      <PageSwitcher />
      {activeSection === 'purchase' && <PurchaseInstallmentData />}
      {activeSection === 'sale' && <SalesInstallmentData/>}
    </div>
  )
}

export default InstallmentsData
