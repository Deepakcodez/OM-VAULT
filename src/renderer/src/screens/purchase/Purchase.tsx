import React from 'react'
import PurchaseForm from './components/PurchaseForm'
import { useFormStore } from '../../state_manager/FormState'
import PurchasesTable from './components/PurchasesTable'
import { useSinglePurchaseStore } from '../../state_manager/singlePurchaseData'
import SinglePurchase from './components/SinglePurchase'
import Searchbar from './components/Searchbar'
import { AddButton, Heading } from '@renderer/components/ui'
import { usePurchaseStore } from '@renderer/state_manager/purchaseData'
import { fetchPurchaseData } from './service'
import { FiPrinter } from 'react-icons/fi'
import {motion} from 'motion/react'
import { exportPurchasesToExcel } from './components/ExportPurchaseInExcel'


const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore()
  const { singlePurchaseData } = useSinglePurchaseStore()
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const { setPurchaseData, purchaseData } = usePurchaseStore()
  const addButtonHandler = () => {
    setShowForm()
  }

  React.useEffect(() => {
    const fetchPurchase = async () => {
      if (!searchQuery || searchQuery === '') {
        const data = await fetchPurchaseData() 
        if (data.length > 0) {
          setPurchaseData(data)
        }
      } else {
        return
      }
    }
    fetchPurchase()
  }, [searchQuery])

  return (
    <div className="text-white ">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredData={setPurchaseData}
        type='purchase'
      />
      <div className="flex justify-between items-center w-full">
        <Heading title="Purchase" />
        <div className='flex gap-2 items-center'>
        <motion.div whileTap={{ scale: 0.9 }}
        onClick={()=>exportPurchasesToExcel(purchaseData)}
        className="hover:bg-zinc-800 p-2 rounded-full">
        <FiPrinter/>
      </motion.div>
        <AddButton onClickHandler={addButtonHandler} />
        </div>
      </div>

      {showForm && <PurchaseForm />}
      {singlePurchaseData && <SinglePurchase />}
      <PurchasesTable refresh={showForm} />
    </div>
  )
}

export default Purchase
