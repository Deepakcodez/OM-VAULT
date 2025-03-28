import React from 'react'
import Installmentcard from '@renderer/components/ui/Installmentcard'
import useYearFilterStore from '@renderer/state_manager/yearFilter'
import { PurchaseDataType } from '@renderer/types/types'

const PurchaseInstallmentData: React.FC = () => {
  const[installments,setInstallments]=React.useState<PurchaseDataType[]>([])
  const[isRefetch, setIsRefetch] = React.useState<boolean>(false);
  const {year} = useYearFilterStore();
  const fetchPurchaseInstallmentData = async () => {
    try {
      const data = await window.electron.getSalesByPaymentMethod('installment', JSON.stringify(year))
      console.log(data, 'data by paytment method')
      console.log('data by paytment method',installments)
      setInstallments(data)
    } catch (error) {
      console.log(error)
      await window.electron.openDialog("Failed to Fetch","We are Unable to fetch the Installment Data", "error")
    }
  }
  React.useEffect(() => {
    fetchPurchaseInstallmentData()
    console.log(isRefetch,"isrefetcgh")
  }, [isRefetch,year])
  return (
    <div className='overflow-y-auto h-[calc(100vh-265px)] hide-scb'>
      <Installmentcard installment={installments} type='sales' refetch={setIsRefetch} />
    </div>
  )
}
export default PurchaseInstallmentData
