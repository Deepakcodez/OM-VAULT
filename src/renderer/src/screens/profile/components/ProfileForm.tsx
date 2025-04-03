import { Input } from '@renderer/components/ui'
import Button from '@renderer/components/ui/Button';
import useCompany from '@renderer/hooks/useCompany';
import React from 'react'
import { z } from 'zod';


const CompanyDetailSchema = z.object({
    companyName: z.string().min(1, 'Company Name is required'),
    companyDescription: z.string().min(1, 'Company Description is required'),
    companyLogoUrl: z.string().min(1, 'Company Logo is required'),
    companyAddress1: z.string().min(1, 'Company Address is required'),
    companyAddress2: z.string().min(1, 'Company Address is required'),
    companyAddress3: z.string().min(1, 'Company Address is required'),
    companyAddress4: z.string().min(1, 'Company Address is required'),
    companyEmail1: z.string().min(1, 'Company Email is required'),
    companyEmail2: z.string().min(1, 'Company Email is required'),
    companyPhone1: z.string().min(1, 'Company Phone is required'),
    companyPhone2: z.string().min(1, 'Company Phone is required'),
})
type CompanyDetailType = z.infer<typeof CompanyDetailSchema>

const ProfileForm: React.FC = () => {
    const { companyDetails: cd } = useCompany()
    React.useEffect(() => {
        console.log("cd", cd);
    }, [cd])

    // const [companyLogo, setCompanyLogo] = React.useState<File | null>(null);
    const [companyDetails, setCompanyDetails] = React.useState<CompanyDetailType>({
        companyName: cd?.companyName || '',
        companyDescription: cd?.description || '',
        companyLogoUrl: cd?.companyLogoUrl || '',
        companyAddress1: cd?.address1 || '',
        companyAddress2: cd?.address2 || '',
        companyAddress3: cd?.address3 || '',
        companyAddress4: cd?.address4 || '',
        companyEmail1: cd?.email1 || '',
        companyEmail2: cd?.email2 || '',
        companyPhone1: cd?.phone1 || '',
        companyPhone2: cd?.phone2 || '',


    })

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file) {
            console.log(file.type.split('/')[0]);
            if (file.type.split('/')[0] !== 'image') return;
            const arrayBuffer = await file.arrayBuffer();
            // const buffer = Buffer.from(arrayBuffer);

            const logoPath = await window.electron.setCompanyLogo(arrayBuffer, file.name);
            console.log(logoPath);
            setCompanyDetails(prev => ({ ...prev, companyLogoUrl: "https://om-enterprises.vercel.app/assets/logo-CCn-I4SE.png" }));
        }
    }

    const handleSubmit = async () => {
        const res = CompanyDetailSchema.safeParse(companyDetails);
        if (!res.success) {
            console.log(res.error);
            return;
        }
        console.log(res.data);
        const resp = await window.electron.setCompany(res.data);
        console.log(resp);
    }


    React.useEffect(() => {
        console.log(companyDetails.companyName);
    }, [companyDetails.companyName])

    return (
        <div className='col-span-8 w-full h-full  flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none'>
            <h1 className='text-white/80 text-3xl'>Edit Company Details</h1>
            <div className=' h-[83vh] overflow-y-scroll py-12 hide-scb flex flex-col gap-4'>
                <Input
                    label='Company Name'
                    style='text-white '
                    value={cd?.companyName as string || ''}
                    placeholder='Enter Company Name'
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyName: e.target.value }))}
                />

                <Input
                    label='Company Description'
                    style='text-white'
                    placeholder='Enter Company Description'
                    value={cd?.description as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyDescription: e.target.value }))}
                />

                <div className='w-full h-[12rem] bg-neutral-200/50 rounded-lg border-dashed border border-white p-12'>
                    <h1 className='text-white text-3xl text-center'>Drag & Drop here</h1>
                    <div className='w-full flex justify-center  items-center h-24 '>
                        <Input
                            type='file'
                            style='text-white w-[14rem] '
                            onChange={handleImage} />
                    </div>
                </div>

                <Input
                    label=' Address1'
                    style='text-white'
                    placeholder='Enter Company Address1 (Street)'
                    value={cd?.address1 as string || ""}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress1: e.target.value }))}
                />
                <Input
                    label=' Address2'
                    style='text-white'
                    placeholder='Enter Company Address1 (City)'
                    value={cd?.address2 as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress2: e.target.value }))}
                />
                <Input
                    label=' Address3'
                    style='text-white'
                    placeholder='Enter Company Address1 (State)'
                    value={cd?.address3 as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress3: e.target.value }))}
                />

                <Input
                    label='Address4'
                    style='text-white'
                    placeholder='Enter Company Address1 (Nation)'
                    value={cd?.address4 as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress4: e.target.value }))}
                />

                <Input
                    label='Email 1'
                    style='text-white'
                    placeholder='Enter Email 1'
                    value={cd?.email1 as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyEmail1: e.target.value }))}
                />
                <Input
                    label='Email 2'
                    style='text-white'
                    placeholder='Enter Email 2'
                    value={cd?.email2 as string || ''}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyEmail2: e.target.value }))}
                />
                <Input
                    label='Phone 1'
                    style='text-white'
                    placeholder='Enter Phone 1'
                    value={cd?.phone1 as string || ""}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyPhone1: e.target.value }))}
                />
                <Input
                    label='Phone 2'
                    style='text-white'
                    placeholder='Enter Phone 2'
                    value={cd?.phone2 as string || ""}
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyPhone2: e.target.value }))}
                />
                <Button
                    label='Submit'
                    className='text-white'
                    onPress={handleSubmit}
                />
            </div>
        </div>

    )
}

export default ProfileForm