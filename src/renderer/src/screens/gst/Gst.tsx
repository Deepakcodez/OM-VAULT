import React from 'react'

const Gst:React.FC = () => {
  const getuser = async () => {
  const users =  await window.electron.getAllUsers();
  console.log(users)
  }
React.useEffect(() =>{
  getuser()
},[])
  return (
    <div  className='text-6xl text-white'>Gst</div>
  )
}

export default Gst
