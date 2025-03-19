import React, { useEffect } from 'react'
import { Input } from '../../../components/ui'
import { fetchFilterPurchaseData } from '../service'
import useDebounce from '@renderer/hooks/useDebounce'
import { PurchaseDataType } from '@renderer/types/types'
import { CiSearch } from "react-icons/ci";
import { fetchFilterSaleData } from '@renderer/screens/sale/service'

type SearchbarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setFilteredData: (data: PurchaseDataType[]) => void
  type:string
}
const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery, setFilteredData , type}) => {
  const debouncedValue = useDebounce(searchQuery, 500)
  useEffect(() => {
    const ftnFetchFilterPurchaseData = async () => {
      if (!debouncedValue) return // Prevent unnecessary calls
      let response
      switch (type) {
        case "sales":
           response = await fetchFilterSaleData(debouncedValue) // Pass the string directly
          break;
        case "purchase":
           response = await fetchFilterPurchaseData(debouncedValue) // Pass the string directly
        default:
          break;
      }
      setFilteredData(response)
      console.log(response)
    }
    ftnFetchFilterPurchaseData()
  }, [debouncedValue])

  return (
    <div className='flex items-center gap-2 bg-zinc-700/20 rounded-full  ps-2 select-none'>
      <CiSearch size={25} className='text-zinc-600' />
      <Input
        style="bg-transparent  border-b border-transparent text-white"
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default Searchbar
