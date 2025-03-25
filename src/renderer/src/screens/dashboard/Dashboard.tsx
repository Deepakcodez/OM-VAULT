import React from 'react'
import { Heading } from '@renderer/components/ui'
import SmallStats from './components/SmallStats'
import Graph from './components/Graph'

const Dashboard: React.FC = () => {
  return (
    <div className=' text-white'>
      <Heading title='Dashboard' />
      <SmallStats />
      <Graph />
    </div>
  )
}

export default Dashboard

