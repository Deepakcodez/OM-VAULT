import React from 'react'
import { Input } from '@renderer/components/ui'
import { InstallmentType } from '@renderer/types/types'
import Button from '@renderer/components/ui/Button'
import { number } from 'zod'

type InstallmentAdderProps = {
  purchaseId: string
  refetch: React.Dispatch<React.SetStateAction<boolean>>
}
const InstallmentAdder: React.FC<InstallmentAdderProps> = ({ purchaseId, refetch }) => {
  const [installment, setInstallment] = React.useState<InstallmentType>({
    rate: 0,
    date: '',
    paymentMethod: 'cash'
  })

  console.log(purchaseId)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Update the state based on the input name
    setInstallment((prev) => ({
      ...prev,
      [name]: name === 'rate' ? parseFloat(value) : value // Ensure rate is always a number
    }))
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (
      installment.date === '' ||
      (typeof installment.rate !== 'number' || installment.rate <= 0)
    ) return;

    try {
      await window.electron.addInstallment(purchaseId, installment)
      refetch((prev) => !prev)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-2 my-2">
        {/* Amount Input */}
        <Input
          name="rate"
          value={installment.rate}
          type="number"
          onChange={handleInputChange}
          placeholder="Amount"
          style="w-full"
        />

        {/* Date Input */}
        <Input
          name="date"
          value={installment.date}
          onChange={handleInputChange}
          type="date"
          style="w-full"
        />

        {/* Payment Method Dropdown */}
        <div className="w-full bg-zinc-800 px-2 flex justify-center items-end rounded-sm border-b border-zinc-400">
          <select
            name="paymentMethod"
            value={installment.paymentMethod}
            onChange={handleInputChange}
            className="h-fit focus:border-none p-2 rounded-sm focus:outline-none w-full bg-zinc-800"
          >
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="upi">UPI</option>
            <option value="credit">Credit</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <Button label="Add" onPress={handleSubmit} />
    </>
  )
}

export default InstallmentAdder
