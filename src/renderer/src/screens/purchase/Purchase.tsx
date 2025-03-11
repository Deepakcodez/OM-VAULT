import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { motion } from 'motion/react'
import PurchaseForm from './components/PurchaseForm'
import { useFormStore } from '../../state_manager/FormState'
import PurchasesTable from './components/PurchasesTable'
import { useSinglePurchaseStore } from '../../state_manager/singlePurchaseData'
import SinglePurchase from './components/SinglePurchase'
import Searchbar from './components/Searchbar'
import { AddButton, Heading } from '@renderer/components/ui'

const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore()
  const { singlePurchaseData } = useSinglePurchaseStore()
  const addButtonHandler=()=>{
    setShowForm()
  }

  return (
    <div className="text-white ">
      <Searchbar />
      <div className="flex justify-between items-center w-full">
        <Heading title="Purchase" />
        <AddButton onClickHandler={addButtonHandler} />
      </div>

      {showForm && <PurchaseForm />}
      {singlePurchaseData && <SinglePurchase />}
      <PurchasesTable refresh={showForm} />
    </div>
  )
}

export default Purchase
