import React from 'react'
import { Table } from '../../../components/ui'
import { ClientType, TableHeadingsTypes } from '../../../types/types'
import { getClient } from '../service'
import { useSingleClientStore } from '@renderer/state_manager/client.store'


type ClientTableProps = {
  refresh: boolean
}

const ClientTable: React.FC<ClientTableProps> = ({refresh}) => {
  const [clientData, setClientData] = React.useState<ClientType[]>([])
  const [selectedRow, setSelectedRow] = React.useState<ClientType | null>(null)
  const {setSingleClientData } = useSingleClientStore()

  const tableHeadings: TableHeadingsTypes[] = [
    { key: 'name', label: 'Client' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'gst', label: 'GST' },
    { key: 'hsn', label: 'HSN' },
    { key: 'address', label: 'Address' }
  ]


  const setRowData = (data) => {
    setSingleClientData(data)
  }
  React.useEffect(() => {
    const loadClientData = async () => {
      const data = await getClient()
      console.log(data)
      setClientData(data)
    }
    loadClientData()
  }, [refresh]) // refresh dependency so it reloads on refresh change

  return (
    <div className="h-[calc(100vh-137px)] hide-scb overflow-y-scroll select-none">
      <Table
        tableHeadings={tableHeadings}
        tableBody={clientData}
        // setRowData= {setClientData}
        showAction= {false}
      />
    </div>
  )
}

export default ClientTable
