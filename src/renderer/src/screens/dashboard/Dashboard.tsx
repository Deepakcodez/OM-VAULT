import React from 'react'
import { Heading } from '@renderer/components/ui'
import SmallStats from './components/SmallStats'
import Graph from './components/Graph'
import Profile from './components/Profile'

const Dashboard: React.FC = () => {
  return (
    <div className=' text-white h-screen overflow-y-scroll hide-scb'>
      <Heading title='Dashboard' />
      <div className='grid grid-cols-12  gap-2 '>
        <div className='col-span-3'>
        <Profile/>
        </div>
        <div className='col-span-9  overflow-hidden'>
          <SmallStats />
        <Graph />
        </div>
      </div>
     
    </div>
  )
}

export default Dashboard

