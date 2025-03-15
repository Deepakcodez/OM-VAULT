import { InstallmentType, PurchaseDataType } from '@renderer/types/types'
import React, { useState } from 'react'
import { RiExpandDiagonalFill } from 'react-icons/ri'
import { MdLocalPrintshop } from 'react-icons/md'
import { AiOutlineShrink } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

type InstallmentcardProps = {
  installment: PurchaseDataType[]
}

const Installmentcard: React.FC<InstallmentcardProps> = ({ installment }) => {
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setSelectedInstallment(selectedInstallment === id ? null : id) // Toggle selection
  }

  return (
    <>
      {installment.map((item) => {
        const isExpanded = selectedInstallment === item.id

        return (
          <div
            key={item.id}
            className={`border border-white/10 mb-2 rounded-md p-4 transition-all duration-300 grid grid-cols-2 gap-2
            `}
          >
            <div>
              <div className="flex gap-2">
                <p className="text-white/80 text-md">{item.productName}</p>
                <p className="text-violet-300"> ₹{item.totalPrice}</p>
              </div>
              <p className="text-white/80 text-xs">
                <span className="text-white/50">Tax:</span> {item.tax}%
              </p>
              <p className="text-white/80 text-xs">
                <span className="text-white/50">Discount:</span> {item.discount}%
              </p>
              <p className="text-white/80 text-xs">
                <span className="text-white/50">Quantity:</span> {item.quantity}
              </p>
              <p
                className={`text-xs ${
                  item.paymentStatus === 'paid'
                    ? 'text-green-500/80'
                    : item.paymentStatus === 'pending'
                      ? 'text-amber-400/80'
                      : 'text-red-500/80'
                }`}
              >
                <span className="text-white/50">Status:</span> {item.paymentStatus}
              </p>
              <p className="text-white/80 text-xs">
                <span className="text-white/50">Ordering Date:</span> {item.orderingDate}
              </p>
              <p className="text-white/80 text-xs">
                <span className="text-white/50">Supplier:</span> {item.supplier}
              </p>
            </div>

            <motion.div
              animate={{
                height: isExpanded ? '' : '160px',
                width: isExpanded ? '100%' : 'auto',
                overflow: 'hidden'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-zinc-800/20 relative rounded-md text-sm overflow-y-scroll p-6"
            >
              {(() => {
                const parsedInstallments = JSON.parse(item.installments) as InstallmentType[]
                const totalInstallmentSum = parsedInstallments.reduce(
                  (sum, installment) => sum + installment.rate!,
                  0
                )

                return (
                  <>
                    <div className="flex gap-2 justify-between">
                      <h1 className="text-zinc-500">Installments</h1>
                      <div className="flex gap-2">
                        <motion.div
                          onClick={() => {}}
                          whileTap={{ scale: 0.8 }}
                          className="bg-zinc-800/80 rounded-full p-2 cursor-pointer"
                        >
                          <MdLocalPrintshop />
                        </motion.div>
                        <motion.div
                          onClick={() => toggleExpand(item.id)}
                          whileTap={{ scale: 0.8 }}
                          className="bg-zinc-800/80 rounded-full p-2 cursor-pointer"
                        >
                          {isExpanded ? <AiOutlineShrink /> : <RiExpandDiagonalFill />}
                        </motion.div>
                      </div>
                    </div>

                    {isExpanded &&
                      parsedInstallments.map((installment, index) => (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            key={index}
                          >
                            ₹ {installment.rate} - {installment.paymentMethod} - {installment.date}
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    <div className="mt-2">
                      <div className="font-bold text-md">Pending Amount: {item.pending}</div>
                      <div className="font-bold text-md">Amount Paid: {totalInstallmentSum}</div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </div>
        )
      })}
    </>
  )
}

export default Installmentcard
