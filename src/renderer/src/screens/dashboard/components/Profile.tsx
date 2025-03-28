import React from 'react'
import LogoPlaceHolder from '../../../assets/images/logo_icon.png'
import Button from '@renderer/components/ui/Button'
const Profile: React.FC = () => {
    return (
        <div className='w-full h-full col-span-6 flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
            <div className='flex flex-col gap-4'>

                <div className='flex flex-col items-center gap-3'>
                    <img src={LogoPlaceHolder} className='xl:h-28 xl:w-28 select-none opacity-35' />
                    <div className=' w-full overflow-hidden text-center'>
                        <h1 className='xl:text-2xl text-lg font-semibold text-white/80 text-wrap truncate'>
                            Om Enterprises
                        </h1>
                        <p className='text-xs text-white/50 truncate'>
                            The Digital Marketing Company
                        </p>
                    </div>
                </div>
                <Button label='Change Logo' />
            </div>
        </div>
    )
}

export default Profile