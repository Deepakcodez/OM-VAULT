import React from 'react'
import ProfileDetail from './components/ProfileDetail'
import ProfileForm from './components/ProfileForm'

const Profile:React.FC = () => {
  return (
    <div className='grid grid-cols-12 w-full gap-4 '>
    <ProfileDetail/>
    <ProfileForm/>
</div>
  )
}

export default Profile