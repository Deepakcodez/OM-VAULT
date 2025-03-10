import React from 'react'
import { useSinglePurchaseStore } from '../../../state_manager/singlePurchaseData'
import { RxCross2 } from 'react-icons/rx'
import { motion } from 'motion/react'
import { MdEditSquare } from "react-icons/md";


const SingleSale: React.FC = () => {
  const { singlePurchaseData, setSinglePurchaseData } = useSinglePurchaseStore()
  return (
    <div className='w-full h-full bg-zinc-800/20 border border-zinc-700 backdrop-blur-md p-4  px-12 rounded-lg'>
      <div className='w-full h-full mt-12 flex  items-center justify-between'>
        <h1 className='text-3xl  truncate'>
          {singlePurchaseData?.productName}
        </h1>
        <div className='flex items-center gap-2'>
        <MdEditSquare/>

        <motion.div
          whileTap={{ scale: 0.5 }}
          className='cursor-pointer hover:bg-zinc-700 p-2 hover:rounded-full duration-300'
          onClick={() => setSinglePurchaseData(null)}
          >
          <RxCross2 size={20} />
        </motion.div>
          </div>
      </div>
      <div className='divide-y mt-7 divide-gray-400/40'>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Price</p>
            
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.price}</p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Quantity</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.quantity}</p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Discount</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.discount} %</p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Tax</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.tax} %</p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Supplier</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.supplier} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Supplier Phone</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.supplierContact} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Supplier Email</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.supplierEmail} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Supplier Address</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.supplierAddress} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Shipping Address</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.supplierAddress} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Payment Mode</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.paymentMethod} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Payment Status</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.paymentStatus} </p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Ordering Date</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.orderingDate} </p>
          </div>
        </div>
        {singlePurchaseData?.installments &&
          singlePurchaseData?.installments.length > 0 && (
            <div className='flex gap-12 py-4'>
              <div className='w-full'>
                <p>Installments</p>
              </div>
              <div className='w-full'>
                {singlePurchaseData?.installments?.map(item => {
                  return (
                    <div className='bg-zinc-800 border border-zinc-700/50 p-2 rounded-lg mb-1'>
                      <p className='text-zinc-400'>
                        Date : <span className='text-white'>{item?.date} </span>
                      </p>
                      <p className='text-zinc-400'>
                        Price :{' '}
                        <span className='text-white'>{item?.rate} </span>
                      </p>
                      <p className='text-zinc-400'>
                        Payment Mode :{' '}
                        <span className='text-white'>
                          {item?.paymentMethod}{' '}
                        </span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
             <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p>Payment Pending</p>
          </div>
          <div className='w-full'>
            <p>{singlePurchaseData?.pending}</p>
          </div>
        </div>
        <div className='flex gap-12 py-4'>
          <div className='w-full'>
            <p className='text-lg '>Total Price</p>
          </div>
          <div className='w-full'>
            <p className='text-lg font-semibold'>
              {singlePurchaseData?.totalPrice}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSale
