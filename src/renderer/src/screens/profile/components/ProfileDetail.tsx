import React from 'react'
import companyLogo from '@renderer/assets/images/logo_icon.png'
import useCompany from '@renderer/hooks/useCompany'
import { useLocalImage } from '@renderer/hooks/useLocalImage';
import { Company } from '@renderer/types/types';


const ProfileDetail: React.FC = () => {
    const { companyDetails, refetch } = useCompany()
    const [cd, setCd] = React.useState<Company>()
    const { imageSrc, setFilePath } = useLocalImage();
    React.useEffect(() => {

        if (companyDetails?.companyLogoUrl) {
            setFilePath(companyDetails?.companyLogoUrl);
        }
    }, [companyDetails,]);

    React.useEffect(() => {
        refetch();
        if (companyDetails) {
            setCd(companyDetails);
        }
    }, [companyDetails]);
    return (
        <div className='col-span-4 w-full flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none overflow-y-scroll h-[92vh] hide-scb'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col items-center gap-3'>
                    <img
                        src={imageSrc || companyLogo}
                        alt="Company Logo"
                        className='xl:h-28 xl:w-28 select-none rounded-full object-cover  '
                    />
                    <div className='w-full overflow-hidden text-center'>
                        <h1 className='xl:text-2xl text-lg font-semibold text-white/80 text-wrap truncate'>
                            {cd?.companyName || 'Company Name'}
                        </h1>
                        <p className='text-xs text-white/50 truncate'>
                            {cd?.description || 'Company description'}
                        </p>
                    </div>
                </div>

                {cd ? (
                    <div className='flex flex-col gap-6 text-white mt-12'>
                        <div className='flex justify-between gap-12'>
                            <h1>Email 1:</h1>
                            <h1>{cd.email1 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12 border-b-[1px] border-neutral-600 pb-2'>
                            <h1>Email 2:</h1>
                            <h1>{cd.email2 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12'>
                            <h1>Phone 1:</h1>
                            <h1>{cd.phone1 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12 border-b-[1px] border-neutral-600 pb-2'>
                            <h1>Phone 2:</h1>
                            <h1>{cd.phone2 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12'>
                            <h1>Address 1:</h1>
                            <h1>{cd.address1 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12'>
                            <h1>Address 2:</h1>
                            <h1>{cd.address2 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12'>
                            <h1>Address 3:</h1>
                            <h1>{cd.address3 || '-'}</h1>
                        </div>
                        <div className='flex justify-between gap-12'>
                            <h1>Address 4:</h1>
                            <h1>{cd.address4 || '-'}</h1>
                        </div>

                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center h-full'>
                        <h1 className='text-white/20 font-bold text-3xl text-center'>No Details Found</h1>
                        <p className='text-white/50'>Register First</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileDetail