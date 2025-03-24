import React from 'react'
import { Table } from '../../../components/ui'
import { PurchaseDataType, TableHeadingsTypes } from '../../../types/types'
import { useSalesData } from '@renderer/state_manager/salesData'
import { useSingleSalesStore } from '@renderer/state_manager/singleSalesData'
import { fetchSaleData } from '../service'
import useYearFilterStore from '@renderer/state_manager/yearFilter'


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
  const { setSingleSalesData } = useSingleSalesStore()
  const{year} = useYearFilterStore()

  const setRowData = (data: PurchaseDataType) => {
    setSingleSalesData(data)
  }

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      const data = await fetchSaleData(JSON.stringify(year)) // Fetch data
      console.log("from sale table ln 33",data)
      if (data.length > 0) {
        setSalesData(data) // Update store with fetched data
      }
    }
    loadPurchaseData()
    // Call the function to fetch and store data
  }, [setSalesData, refresh,year])

  return (
    <div className="h-[calc(100vh-137px)]  hide-scb overflow-y-scroll select-none">
      <Table 
      tableHeadings={tableHeadings} 
      tableBody={salesData} 
      setRowData={setRowData} />
    </div>
  )
}

export default PurchasesTable
