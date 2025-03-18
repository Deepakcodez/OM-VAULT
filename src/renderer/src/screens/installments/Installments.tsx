import React from 'react'
import { Heading } from '@renderer/components/ui'
import InstallmentsData from './components/InstallmentsData'
// import Searchbar from '../purchase/components/Searchbar'

const Installments:React.FC = () => {
  return (
    <div className='text-white  relative'>
      {/* <Searchbar/> */}
      <Heading title='Installments' />
       <InstallmentsData/>
    </div>
  )
}

export default Installments
