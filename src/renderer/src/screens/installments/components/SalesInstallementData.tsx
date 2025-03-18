import Installmentcard from '@renderer/components/ui/Installmentcard'
import { PurchaseDataType } from '@renderer/types/types'
import React from 'react'

const SalesInstallmentData: React.FC = () => {
  const[installments,setInstallments]=React.useState<PurchaseDataType[]>([])
  const[isRefetch, setIsRefetch] = React.useState<boolean>(false);
  const fetchPurchaseInstallmentData = async () => {
    console.log('data by paytment method')
    try {
      const data = await window.electron.getSalesByPaymentMethod('installment')
      console.log(data, 'data by paytment method')
      setInstallments(data)
    } catch (error) {
      console.log(error)
      await window.electron.openDialog("Failed to Fetch","We are Unable to fetch the Installment Data", "error")
    }
  }
  React.useEffect(() => {
    fetchPurchaseInstallmentData()
  }, [isRefetch])
  return (
    <div className='overflow-y-auto h-[calc(100vh-265px)] hide-scb'>
      <Installmentcard installment={installments} refetch={setIsRefetch} />
    </div>
  )
}

export default SalesInstallmentData
