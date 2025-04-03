import React from 'react'
import companyLogo from '@renderer/assets/images/logo_icon.png'
import useCompany from '@renderer/hooks/useCompany'
const ProfileDetail: React.FC = () => {
    const { companyDetails } = useCompany()
    return (
        <div className='col-span-4 w-full h-full  flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none'>
            <div className='flex flex-col gap-4'>

                <div className='flex flex-col items-center gap-3'>
                    <img
                        src={companyLogo}
                        className='xl:h-28 xl:w-28 select-none opacity-35' />
                    <div className=' w-full overflow-hidden text-center'>
                        <h1 className='xl:text-2xl text-lg font-semibold text-white/80 text-wrap truncate'>
                            {companyDetails?.companyName}
                        </h1>
                        <p className='text-xs text-white/50 truncate'>
                            {companyDetails?.description}
                        </p>
                    </div>
                </div>

                {/* details */}
                <div className='flex flex-col gap-6 text-white mt-12 '>
                    <div className='flex justify-between gap-12'>
                        <h1>Email 1 :</h1>
                        <h1>{companyDetails?.email1}</h1>
                    </div>
                    <div className='flex justify-between  gap-12  border-b-[1px] border-neutral-600 pb-2'>
                        <h1>Email 2 :</h1>
                        <h1>{companyDetails?.email2}</h1>
                    </div>
                    <div className='flex justify-between gap-12'>
                        <h1>Phone 1 :</h1>
                        <h1>{companyDetails?.phone1}</h1>
                    </div>
                    <div className='flex justify-between gap-12 border-b-[1px] border-neutral-600 pb-2'>
                        <h1>Phone 2 :</h1>
                        <h1>{companyDetails?.phone2}</h1>
                    </div>
                    <div className='flex justify-between gap-12'>
                        <h1>Address 1 :</h1>
                        <h1>{companyDetails?.address1}</h1>
                    </div>
                    <div className='flex justify-between gap-12'>
                        <h1>Address 2 :</h1>
                        <h1>{companyDetails?.address2}</h1>
                    </div>
                    <div className='flex justify-between gap-12'>
                        <h1>Address 3 :</h1>
                        <h1>{companyDetails?.address3}</h1>
                    </div>
                    <div className='flex justify-between gap-12'>
                        <h1>Address 4 :</h1>
                        <h1>{companyDetails?.address4}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail