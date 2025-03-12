import Installmentcard from '@renderer/components/ui/Installmentcard'
import { PurchaseDataType } from '@renderer/types/types'
import React from 'react'

const PurchaseInstallmentData: React.FC = () => {
  const[installments,setInstallments]=React.useState<PurchaseDataType[]>([])
  const fetchPurchaseInstallmentData = async () => {
    console.log('data by paytment method')
    try {
      const data = await window.electron.getPurchaseByPaymentMethod('installment')
      console.log(data, 'data by paytment method')
      setInstallments(data)
    } catch (error) {
      console.log(error)
      await window.electron.openDialog("Failed to Fetch","We are Unable to fetch the Installment Data", "error")
    }
  }
  React.useEffect(() => {
    fetchPurchaseInstallmentData()
  }, [])
  return (
    <div>
      <Installmentcard installment={installments}/>
    </div>
  )
}

export default PurchaseInstallmentData
