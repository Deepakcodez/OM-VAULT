import React from 'react'

const Gst: React.FC = () => {
  const [user, setUser] = React.useState<any[]>([])
  const getuser = async () => {
    const users = await window.electron.getAllUsers()
    setUser(users)
    console.log(users)
  }
  React.useEffect(() => {
    getuser()
  }, [])
  return (
    <div className="text-6xl text-white">
      {user?.map((item, index) => (
        <div key={index} className=" text-6xl text-white">
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Gst
