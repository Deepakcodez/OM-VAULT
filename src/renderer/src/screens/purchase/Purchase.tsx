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
import {motion} from 'motion/react'
import { exportPurchasesToExcel } from './components/ExportPurchaseInExcel'
import useYearFilterStore from '@renderer/state_manager/yearFilter'
import { HiFolderDownload } from "react-icons/hi";


const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore()
  const { singlePurchaseData } = useSinglePurchaseStore()
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const { setPurchaseData, purchaseData } = usePurchaseStore()
  const{year} = useYearFilterStore()


  React.useEffect(() => {
    const fetchPurchase = async () => {
      if (!searchQuery || searchQuery === '') {
        const data = await fetchPurchaseData(JSON.stringify(year)) 
        if (data.length > 0) {
          setPurchaseData(data)
        }
      } else {
        return
      }
    }
    fetchPurchase()
  }, [searchQuery, year])

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
        <HiFolderDownload size={25}/>
      </motion.div>
        <AddButton onClickHandler={()=> setShowForm()} />
        </div>
      </div>

      {showForm && <PurchaseForm />}
      {singlePurchaseData && <SinglePurchase />}
      <PurchasesTable refresh={showForm} />
    </div>
  )
}

export default Purchase
