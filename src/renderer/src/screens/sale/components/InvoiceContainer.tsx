import React from 'react'
import {motion} from'motion/react'
import { RxCross2 } from 'react-icons/rx'
import { TfiDownload } from 'react-icons/tfi'
import { MdOutlineLocalPrintshop } from 'react-icons/md'
import Invoice from '@renderer/components/ui/Invoice'

type InvoiceContainerProps = {
  isShowInvoice: boolean;
  setIsShowInvoice: React.Dispatch<React.SetStateAction<boolean>>;
};

const InvoiceContainer:React.FC<InvoiceContainerProps>= ({isShowInvoice, setIsShowInvoice}) => {

  return (
    <div className='absolute top-0 left-0 bottom-0 w-full max-h-max bg-black/80 flex flex-col justify-center items-center gap-4 overflow-hidden  '>
    <div className=' absolute right-12 flex flex-col  justify-center  gap-2 '>

      <motion.div
        whileTap={{ scale: 0.5 }}
        className="cursor-pointer bg-zinc-700   h-12 w-12 flex justify-center items-center rounded-full duration-300"
        onClick={() => setIsShowInvoice(!isShowInvoice)}
      >
        <RxCross2 size={20} />
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.5 }}
        className=" cursor-pointer bg-zinc-700   h-12  w-12 flex justify-center items-center aspect-square rounded-full duration-300"
        onClick={() => setIsShowInvoice(!isShowInvoice)}
      >
        <TfiDownload size={20} />
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.5 }}
        className="cursor-pointer bg-zinc-700   h-12  w-12 flex justify-center items-center aspect-square rounded-full duration-300"
        onClick={() => setIsShowInvoice(!isShowInvoice)}
      >
        <MdOutlineLocalPrintshop size={20} />
      </motion.div>
    </div>
    <Invoice />
  </div>
  )
}

export default InvoiceContainer