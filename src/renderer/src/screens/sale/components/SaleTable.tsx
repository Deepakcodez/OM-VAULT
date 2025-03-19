import React from 'react'
import { Table } from '../../../components/ui'
import { PurchaseDataType, TableHeadingsTypes } from '../../../types/types'
import { useSalesData } from '@renderer/state_manager/salesData'
import { useSingleSalesStore } from '@renderer/state_manager/singleSalesData'
import { fetchPurchaseData } from '@renderer/screens/purchase/service'

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
  const { salesData, setSalesData } = useSalesData()
  console.log(salesData,"sales  data ")
  const { setSingleSalesData } = useSingleSalesStore()

  const setRowData = (data: PurchaseDataType) => {
    setSingleSalesData(data)
    console.log(data,"sdatatagfadsgasd")
  }

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      const data = await fetchPurchaseData() // Fetch data
      console.table(data)
      if (data.length > 0) {
        setSalesData(data) // Update store with fetched data
      }
    }
    loadPurchaseData()
    // Call the function to fetch and store data
  }, [setSalesData, refresh])

  return (
    <div className="h-[calc(100vh-137px)]  hide-scb overflow-y-scroll select-none">
      <Table tableHeadings={tableHeadings} tableBody={salesData} setRowData={setRowData} />
    </div>
  )
}

export default PurchasesTable
