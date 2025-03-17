import React, { useEffect } from 'react'
import { Input } from '../../../components/ui'
import { fetchFilterPurchaseData } from '../service'
import useDebounce from '@renderer/hooks/useDebounce'
import { PurchaseDataType } from '@renderer/types/types'

type SearchbarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setFilteredData: (data: PurchaseDataType[]) => void
}
const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery, setFilteredData }) => {
  const debouncedValue = useDebounce(searchQuery, 500)
  useEffect(() => {
    const ftnFetchFilterPurchaseData = async () => {
      if (!debouncedValue) return // Prevent unnecessary calls
      const response = await fetchFilterPurchaseData(debouncedValue) // Pass the string directly
      setFilteredData(response)
      console.log(response)
    }
    ftnFetchFilterPurchaseData()
  }, [debouncedValue])

  return (
    <div>
      <Input
        style="bg-zinc-700/20 rounded-full p-2 ps-5 border-b border-transparent text-white"
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default Searchbar
