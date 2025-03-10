import React from 'react'
import { Input } from '../../../components/ui'

const Searchbar:React.FC = () => {
  return (
    <div>
       <div>
        <Input 
        style='bg-zinc-700/20 rounded-full p-2 ps-5 border-b border-transparent text-white'
          placeholder="Search Items"
        />
       </div>
    </div>
  )
}

export default Searchbar
