import React from 'react'

const Graph:React.FC = () => {
  return (
    <div className='grid grid-cols-12 mt-2  w-full gap-2 '>
    <div className='w-full col-span-6 flex flex-col h-[12rem] p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
        <h1 className='text-2xl'>Sales</h1>
    </div>

    <div className='w-full h-[12rem] col-span-6 flex flex-col  p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
        <h1 className='text-2xl'>Purchase</h1>
    </div>

  </div>
  )
}

export default Graph