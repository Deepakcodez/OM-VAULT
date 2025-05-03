import React from 'react'
import { AddButton } from '@renderer/components/ui'
import AddClient from './AddClient/AddClient'
import { AnimatePresence } from 'motion/react'
import { getClient } from './service'
import ClientTable from './components/ClientTable'

const Client: React.FC = () => {
  const [showAddClient, setShowAddClient] = React.useState<boolean>(false)
  const [refresh, setRefresh] = React.useState<boolean>(false)
  React.useEffect(() => {
    const fetchclients = async () => {
      const resp = await getClient()
      console.log(resp)
    }
    fetchclients()
  }, [])
  return (
    <div className="text-white overflow-hidden h-screen hide-scb">
      {/* <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredData={setSalesData}
        type="sales"
      /> */}

      <div className="flex flex-col justify-between items-center w-full ">
        <div className=" w-full flex gap-2   justify-between">
          <h1 className="heading-text select-none text-white ">Clients</h1>
          <div className="flex justify-between  gap-2 items-center ">
            <AddButton onClickHandler={() => setShowAddClient(!showAddClient)} />
          </div>
        </div>
        <ClientTable refresh={refresh} />

        <AnimatePresence>
          {showAddClient && <AddClient setRefresh={setRefresh} setShowAddClient={setShowAddClient} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Client
