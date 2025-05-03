import React from 'react'
import { motion } from 'motion/react'
import Button from '@renderer/components/ui/Button'
import { AddClientPopUpanimation } from '@renderer/utils/varients'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addClient } from '../service'
import { ClientSchema, ClientSchemaType } from '@renderer/types/Schemas'

const AddClient = ({
  setShowAddClient,
  setRefresh
}: {
  setShowAddClient: React.Dispatch<React.SetStateAction<boolean>>
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientSchemaType>({ resolver: zodResolver(ClientSchema) })

  const onSubmit: SubmitHandler<ClientSchemaType> = async (data) => {
    addClient(data)
    setShowAddClient(false)
    setRefresh((prev) => !prev)
  }

  return (
    <motion.div
      variants={AddClientPopUpanimation}
      initial="initial"
      animate="start"
      exit="exit"
      className="absolute left-4 right-4 bottom-0 flex flex-col items-center py-1 lg:px-24 bg-neutral-800 min-h-[15rem] h-auto rounded-t-4xl border-l border-r border-t border-neutral-500"
    >
      <motion.div
        onClick={() => setShowAddClient(false)}
        whileTap={{ scaleX: 1.2 }}
        className="bg-neutral-500 h-2 w-24 rounded-full cursor-pointer"
      />
      <h1 className="text-2xl font-semibold text-white mt-4">Add Clients</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto p-4 pb-24 flex flex-col gap-8"
      >
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              placeholder="Enter Name"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('name')}
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex-1">
            <input
              placeholder="Enter Email"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('email')}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex-1">
            <input
              placeholder="Enter Phone"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              placeholder="Enter GST Number"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('gst')}
            />
            {errors.gst && <p className="text-red-400 text-sm">{errors.gst.message}</p>}
          </div>
          <div className="flex-1">
            <input
              placeholder="Enter HSN"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('hsn')}
            />
            {errors.hsn && <p className="text-red-400 text-sm">{errors.hsn.message}</p>}
          </div>
          <div className="flex-1">
            <input
              placeholder="Enter Address"
              className="focus:outline-none focus:ring-0 border-0 border-b bg-neutral-700/20 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 "
              {...register('address')}
            />
            {errors.address && <p className="text-red-400 text-sm">{errors.address.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button label="Add" type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default AddClient
