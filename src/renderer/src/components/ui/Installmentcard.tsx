import { InstallmentType, PurchaseDataType } from '@renderer/types/types'
import React, { useState } from 'react'
import { RiExpandDiagonalFill } from 'react-icons/ri'
import { MdLocalPrintshop } from 'react-icons/md'
import { AiOutlineShrink } from 'react-icons/ai'
import { GoPlus } from 'react-icons/go'
import { motion, AnimatePresence } from 'framer-motion'
import InstallmentAdder from '@renderer/screens/installments/components/InstallmentAdder'
import { calculatePendingAmount } from '@renderer/utils/Helper'

type InstallmentcardProps = {
  installment: PurchaseDataType[]
  refetch: React.Dispatch<React.SetStateAction<boolean>>
}

const Installmentcard: React.FC<InstallmentcardProps> = ({ installment, refetch }) => {
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(null)
  const [isShowInstallmentAdder, setIsShowInstallmentAdder] = useState<boolean>(false)

  const toggleExpand = (id: string) => {
    setSelectedInstallment(selectedInstallment === id ? null : id)
  }
  console.log(installment)

  return (
    <>
      {installment.toReversed().map((item) => {
        const isExpanded = selectedInstallment === item.id

        return (
          <div
            key={item.id}
            className={`border border-white/10 mb-2 rounded-md p-4 transition-all duration-300 grid grid-cols-2 gap-2`}>
            <div>
              <div className="flex gap-2">
                <p className="text-white text-2xl">{item.productName}</p>
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
                  (sum, installment) => sum + Number(installment.rate!),
                  0
                )

                return (
                  <>
                    <div className="min-h-[6rem] h-auto">
                      <div className="flex gap-2 justify-between">
                        <h1 className="text-zinc-500">Installments</h1>
                        <div className="flex gap-2 items-center  mb-2">
                          <motion.div
                            onClick={() => {}}
                            whileTap={{ scale: 0.8 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-zinc-800/80 rounded-full p-2 cursor-pointer"
                          >
                            <MdLocalPrintshop />
                          </motion.div>
                          {isExpanded && (
                            <motion.div
                              onClick={() => {
                                setIsShowInstallmentAdder(!isShowInstallmentAdder),
                                  setSelectedInstallment(item.id)
                              }}
                              initial={{ x: 10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="bg-zinc-800/80 rounded-full p-2 cursor-pointer"
                            >
                              <GoPlus
                                className={`${isShowInstallmentAdder ? 'rotate-45 duration-75 transition-all ' : 'rotate-0 duration-75'}`}
                              />
                            </motion.div>
                          )}
                          <motion.div
                            onClick={() => toggleExpand(item.id)}
                            whileTap={{ scale: 0.8 }}
                            className="bg-zinc-800/80 rounded-full p-2 cursor-pointer"
                          >
                            {isExpanded ? <AiOutlineShrink /> : <RiExpandDiagonalFill />}
                          </motion.div>
                        </div>
                      </div>
                      {/* START -------------- Installments  ----------- START */}
                      {isExpanded &&
                        parsedInstallments.map((installment, index) => (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1,
                                ease: 'easeInOut',
                                type: 'spring',
                                damping: 10,
                                stiffness: 100,
                                delay: index * 0.1
                              }}
                              key={index}
                              className="bg-zinc-800/50 p-2 rounded-md border-s border-violet-300/40 mb-2"
                            >
                              ₹ {installment.rate} - {installment.paymentMethod} -{' '}
                              {installment.date}
                            </motion.div>
                          </AnimatePresence>
                        ))}
                      {/* START -------------- Installments  ----------- START */}

                      {/* START ------ Installment add button ----------START */}
                      <div className="w-full flex justify-between items-center flex-wrap">
                        {isShowInstallmentAdder && selectedInstallment === item.id && (
                          <InstallmentAdder purchaseId={selectedInstallment} refetch={refetch} />
                        )}
                      </div>
                      {/* END ------- Installment add button -------- END */}

                      {/* START -------- amount ---------- START   */}
                      <div className="mt-2">
                        <div className="font-bold text-md">
                          {' '}
                          <span className="text-zinc-500">Pending Amount: </span>{' '}
                          {calculatePendingAmount(totalInstallmentSum, item.totalPrice!)}
                        </div>
                        <div className="font-bold text-md">
                          <span className="text-zinc-500">Amount Paid: </span> {totalInstallmentSum}
                        </div>
                      </div>
                      {/* END -------- amount ---------- END   */}
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
