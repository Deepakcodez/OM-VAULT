import React from 'react'
import { Table } from '../../../components/ui'
import { usePurchaseStore } from '../../../state_manager/purchaseData'
import { fetchPurchaseData } from '../service'
import { PurchaseDataType, TableHeadingsTypes } from '../../../types/types'
import { useSinglePurchaseStore } from '@renderer/state_manager/singlePurchaseData'

type PurchasesTableProps = {
  refresh: boolean
}
const PurchasesTable: React.FC<PurchasesTableProps> = ({ refresh }) => {
  const tableHeadings: TableHeadingsTypes[] = [
    { key: 'productName', label: 'Item' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'pending', label: 'Pending' },
    { key: 'totalPrice', label: 'Grandtotal' },
    { key: 'paymentStatus', label: 'Status' }
  ]
  const { purchaseData, setPurchaseData } = usePurchaseStore()
  const { setSinglePurchaseData } = useSinglePurchaseStore()

  const setRowData = (data: PurchaseDataType) => {
    setSinglePurchaseData(data)
  }

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      const data = await fetchPurchaseData() // Fetch data
      console.table(data)
      if (data.length > 0) {
        setPurchaseData(data) // Update store with fetched data
      }
    }
    loadPurchaseData()
    // Call the function to fetch and store data
  }, [setPurchaseData, refresh])

  return (
    <div className="h-[calc(100vh-137px)]  hide-scb overflow-y-scroll select-none">
      <Table tableHeadings={tableHeadings} tableBody={purchaseData} setRowData={setRowData} />
    </div>
  )
}

export default PurchasesTable
