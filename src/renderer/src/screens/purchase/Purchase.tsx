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

const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore()
  const { singlePurchaseData } = useSinglePurchaseStore()
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const { setPurchaseData } = usePurchaseStore()
  const addButtonHandler = () => {
    setShowForm()
  }

  React.useEffect(() => {
    const fetchPurchase = async () => {
      if (!searchQuery || searchQuery === '') {
        const data = await fetchPurchaseData() // Fetch data
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
      />
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
