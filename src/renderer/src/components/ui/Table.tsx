import React, { useEffect } from 'react'
import { PurchaseDataType, TableHeadingsTypes } from '../../types/types'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { motion } from 'motion/react'
import { useSinglePurchaseStore } from '../../state_manager/singlePurchaseData'
type TableProps = {
  tableHeadings: TableHeadingsTypes[]
  tableBody: any[]
  setRowData: (data: PurchaseDataType) => void
}
const Table: React.FC<TableProps> = ({ tableHeadings, tableBody, setRowData }) => {
  const { singlePurchaseData, setSinglePurchaseData } = useSinglePurchaseStore()

  useEffect(() => {
    console.log('single purchase data in table', singlePurchaseData)
  }, [singlePurchaseData])
  return (
    <div className="relative">
      <table className="table-fixed  rounded-t-lg border-spacing-x text-white w-full border-separate">
        <thead className="border bg-zinc-600 sticky top-0">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className=" font-light text-sm py-2 truncate  ">
                {heading.label}
              </th>
            ))}
            <th className="text-sm py-2 font-light truncate">Action</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800">
          {tableBody.map((row, rowIndex) => (
            <tr key={rowIndex} className="py-2 h-full ">
              {tableHeadings.map((heading, colIndex) => (
                <td
                  key={colIndex}
                  className={`ps-2 text-center py-2 truncate ${heading.key === 'paymentStatus' && (row[heading.key] === 'pending' ? 'text-amber-300' : row[heading.key] === 'paid' ? 'text-green-400' : 'text-red-400')}`}
                >
                  {row[heading.key]}{' '}
                </td>
              ))}
              <td className=" text-center mx-auto px-12 ">
                {/* <div className="bg-green-200 mx-auto"> */}

                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="cursor-pointer hover:bg-zinc-700 rounded-full p-1 h-full  w-fit"
                  onClick={() => setRowData(row)}
                >
                  <IoEllipsisHorizontalSharp />
                </motion.div>
                {/* </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
