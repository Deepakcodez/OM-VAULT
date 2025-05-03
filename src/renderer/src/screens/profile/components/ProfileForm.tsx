import { Input } from '@renderer/components/ui'
import Button from '@renderer/components/ui/Button';
import useCompany from '@renderer/hooks/useCompany';
import { useLocalImage } from '@renderer/hooks/useLocalImage';
import React from 'react'
import {  z } from 'zod';


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

const ProfileForm = () => {
    const { companyDetails: cd, refetch } = useCompany()
    const { setFilePath } = useLocalImage();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        handleDropImage(file);
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const res = CompanyDetailSchema.safeParse(companyDetails);
            if (!res.success) {
                console.log(res.error);
                return;
            }
            await window.electron.setCompany(res.data);
            await refetch();
        } catch (error) {
            await window.electron.openDialog("Something Wrong","Fail to Updata the Details",'error')
        }
        finally {
            setIsSubmitting(false);
        }

    }

    const handleOndragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e.dataTransfer);
        e.dataTransfer.dropEffect = "copy";
      };

      const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

      };

      const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!e.dataTransfer.files[0]) return;

        if (e.dataTransfer.files[0]) {
            handleDropImage(e.dataTransfer.files[0]);
        }
      };

      const handleDropImage = async (file:File) => {
        if (file) {
            console.log(file.type.split('/')[0]);
            if (file.type.split('/')[0] !== 'image') return;
            const arrayBuffer = await file.arrayBuffer();


            const logoPath = await window.electron.setCompanyLogo(arrayBuffer, file.name);
            setFilePath(logoPath);
            console.log(logoPath);
            setCompanyDetails(prev => ({ ...prev, companyLogoUrl: logoPath }));
        }
      }


    return (
        <div className='col-span-8 w-full h-full  flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none'>
            <h1 className='text-white/80 text-3xl'>Edit Company Details</h1>
            <div className=' h-[83vh] overflow-y-scroll py-12 hide-scb flex flex-col gap-4'>
                <Input
                    label='Company Name'
                    style='text-white '
                    value={companyDetails?.companyName }
                    placeholder='Enter Company Name'
                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyName: e.target.value }))}
                />

                <Input
                    label='Company Description'
                    style='text-white'
                    placeholder='Enter Company Description'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyDescription: e.target.value }))}
                />

                <div
                onDragOver={handleOndragOver}
                onDragLeave={handleOnDragLeave}
                onDrop={handleOnDrop}
                className='relative w-full h-[14rem] bg-neutral-200/50 rounded-lg border-dashed border border-white px-12 pt-12 pb-24'>
                    <h1 className='text-white text-3xl text-center'>Drag & Drop here</h1>

                        <Input
                            type='file'
                            style='text-white w-[14rem] absolute left-0 right-0 bottom-6  m-auto  '
                            onChange={handleImage} />

                </div>

                <Input
                    label=' Address1'
                    style='text-white'
                    placeholder='Enter Company Address1 (Street)'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress1: e.target.value }))}
                />
                <Input
                    label=' Address2'
                    style='text-white'
                    placeholder='Enter Company Address1 (City)'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress2: e.target.value }))}
                />
                <Input
                    label=' Address3'
                    style='text-white'
                    placeholder='Enter Company Address1 (State)'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress3: e.target.value }))}
                />

                <Input
                    label='Address4'
                    style='text-white'
                    placeholder='Enter Company Address1 (Nation)'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress4: e.target.value }))}
                />

                <Input
                    label='Email 1'
                    style='text-white'
                    placeholder='Enter Email 1'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyEmail1: e.target.value }))}
                />
                <Input
                    label='Email 2'
                    style='text-white'
                    placeholder='Enter Email 2'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyEmail2: e.target.value }))}
                />
                <Input
                    label='Phone 1'
                    style='text-white'
                    placeholder='Enter Phone 1'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyPhone1: e.target.value }))}
                />
                <Input
                    label='Phone 2'
                    style='text-white'
                    placeholder='Enter Phone 2'

                    onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyPhone2: e.target.value }))}
                />
                <Button
                    label={isSubmitting ? 'Submitting...' : 'Submit'}
                    className='text-white'
                    onPress={handleSubmit}
                />
            </div>
        </div>

    )
}

export default ProfileForm


