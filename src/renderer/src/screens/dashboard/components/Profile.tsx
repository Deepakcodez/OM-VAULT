import React from 'react'
import LogoPlaceHolder from '../../../assets/images/logo_icon.png'
import useCompany from '@renderer/hooks/useCompany'
import { useLocalImage } from '@renderer/hooks/useLocalImage';
const Profile: React.FC = () => {
    const { companyDetails } = useCompany()
    const {imageSrc, setFilePath} = useLocalImage();

    React.useEffect(() => {
        if (companyDetails?.companyLogoUrl) setFilePath(companyDetails?.companyLogoUrl);
    }, [companyDetails,]);

    return (
        <div className='w-full h-fit col-span-6 flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
            <div className='flex flex-col gap-4'>

                <div className='flex flex-col items-center gap-3'>
                    <img src={imageSrc || LogoPlaceHolder} className='xl:h-28 xl:w-28 select-none rounded-full object-cover ' />
                    <div className=' w-full overflow-hidden text-center'>
                        <h1 className='xl:text-2xl text-lg font-semibold text-white/80 text-wrap truncate'>
                            {companyDetails?.companyName}
                        </h1>
                        <p className='text-xs text-white/50 truncate'>
                           {companyDetails?.description}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile