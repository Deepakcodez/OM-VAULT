import { InstallmentType, PurchaseDataType } from '@renderer/types/types'
import React from 'react'
type InstallmentcardProps = {
  installment: PurchaseDataType[]
}
const Installmentcard: React.FC<InstallmentcardProps> = ({ installment }) => {
  return (
    <>
      {installment.map((item) => {
        return (
          <>
            <div
              key={item.id}
              className="grid grid-cols-2 gap-2 justify-between border border-white/10 mb-2  rounded-md p-4"
            >
              <div>
                <div className="flex gap-2">
                  <p className="text-white/80 text-md">{item.productName}</p>
                  <p className=" text-violet-300"> ₹{item.totalPrice}</p>
                </div>
                <p className="text-white/80 text-xs">
                  {' '}
                  <span className="text-white/50">Tax:</span> {item.tax}%
                </p>
                <p className="text-white/80 text-xs">
                  {' '}
                  <span className="text-white/50">Discount:</span> {item.discount}%
                </p>
                <p className="text-white/80 text-xs">
                  {' '}
                  <span className="text-white/50">Quantity:</span> {item.quantity}
                </p>
                <p
                  className={` text-xs ${item.paymentStatus && item.paymentStatus === 'paid' ? 'text-green-500/80' : item.paymentStatus === 'pending' ? 'text-amber-400/80' : 'text-red-500/80'} `}
                >
                  {' '}
                  <span className="text-white/50">Status:</span> {item.paymentStatus}
                </p>
                <p className="text-white/80 text-xs">
                  {' '}
                  <span className="text-white/50">Ordering Date:</span> {item.orderingDate}
                </p>
                <p className="text-white/80 text-xs">
                  {' '}
                  <span className="text-white/50">Supplier:</span> {item.supplier}
                </p>
              </div>
              <div>
                <div className={` rounded-md text-sm overflow-y-scroll h-40 om-scrollbar p-6`}>
                  {(() => {
                    const parsedInstallments = JSON.parse(item.installments) as InstallmentType[]
                    const totalInstallmentSum = parsedInstallments.reduce(
                      (sum, installment) => sum + installment.rate!,
                      0
                    )

                    return (
                      <>
                        {parsedInstallments.map((installment, index) => (
                          <div key={index}>
                            ₹ {installment.rate} - {installment.paymentMethod} - {installment.date}
                          </div>
                        ))}
                        <div className="mt-2">
                          <div className="font-bold text-md">Pending Amount : {item.pending}</div>
                          <div className="font-bold text-md">
                            Amount Paid : {totalInstallmentSum}
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default Installmentcard
