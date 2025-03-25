import React, { useState } from 'react'
import { Input } from '../../../components/ui'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import Button from '../../../components/ui/Button'
import { useFormStore } from '../../../state_manager/FormState'
import { RxCross2 } from 'react-icons/rx'
import { PurchaseDataType, SalesDataType } from '../../../types/types'
import { calculateTotalPrice } from '../../../libs/utilityFunc'
import { v4 as uuid } from 'uuid'
import { z } from 'zod';

const SaleSchema = z.object({
  id: z.string().optional(),
  productName: z.string().min(1, 'Product Name is required'),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().positive('Quantity must be greater than 0'),
  discount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%'),
  tax: z.number().min(0, 'Tax cannot be negative').max(100, 'Tax cannot exceed 100%'),
  supplier: z.string().min(1, 'Supplier is required'),
  supplierContact: z
    .string()
    .min(10, 'Supplier Contact is required')
    .max(15, 'Supplier Contact is too long'),
  supplierEmail: z.string().email('Invalid email address'),
  supplierAddress: z.string().min(1, 'Supplier Address is required'),
  shippingAddress: z.string().min(1, 'Shipping Address is required'),
  paymentStatus: z.enum(['paid', 'pending', 'cancelled']),
  paymentMethod: z.enum([
    'cash',
    'cheque',
    'creditCard',
    'bankTransfer',
    'upi',
    'installment',
    'other',
  ]),
  orderingDate: z.string().min(1, 'Ordering Date is required'),
  isInstallment: z.boolean(),
  installments: z
    .array(
      z.object({
        date: z.string(),
        rate: z.number().min(0, 'Installment rate cannot be negative'),
        paymentMethod: z.enum(['cash', 'cheque', 'upi', 'credit']),
      })
    )
    .optional(),
  pending: z.number().min(0, 'Pending amount cannot be negative').optional(),
  totalPrice: z.number().min(0, 'Total price cannot be negative').optional(),
});


const SaleForm: React.FC = () => {
  const { setShowForm } = useFormStore()
  const [isInstallment, setIsInstallment] = useState<boolean>(false)
  const [pendingPaymentAmount, setPendingPaymentAmount] = useState<number>(0)
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saleData, setSaleData] = useState<SalesDataType>({
    id: '',
    productName: '',
    price: 0,
    quantity: 0,
    discount: 0,
    tax: 0,
    supplier: '',
    supplierContact: '',
    supplierEmail: '',
    supplierAddress: '',
    shippingAddress: '',
    paymentStatus: 'pending',
    paymentMethod: 'other',
    orderingDate: '',
    isInstallment: isInstallment,
    installments: [
      {
        date: new Date().toISOString().split('T')[0],
        rate: 0,
        paymentMethod: 'cash'
      }
    ],
    pending: 0,
    totalPrice: 0
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const parsedValue = ['price', 'quantity', 'discount', 'tax'].includes(name)
      ? Number(value)
      : value;

    // Update the purchase data
    setSaleData((prev) => ({ ...prev, [name]: parsedValue }));

    // Validate the field using Zod
    try {
      const fieldSchema = SaleSchema.shape[name];
      fieldSchema.parse(parsedValue);
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleInstallmentChange = (
    index: number,
    value: number | string,
    field: 'rate' | 'paymentMethod'
  ) => {
    setSaleData((prev) => {
      const newInstallments = [...prev.installments];
      if (field === 'rate') {
        newInstallments[index].rate = value as number;
      } else {
        newInstallments[index].paymentMethod = value as string;
      }
      return { ...prev, installments: newInstallments };
    });

    // Validate the updated installment
    const updatedInstallment = saleData.installments[index];
    try {
      // Access the schema for individual installments
      const installmentSchema = SaleSchema.shape.installments.unwrap().element;
      installmentSchema.parse(updatedInstallment); // Validate the installment
      // Clear the error if validation passes
      setErrors((prev) => ({
        ...prev,
        [`installments[${index}].${field}`]: '',
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set the error message if validation fails
        setErrors((prev) => ({
          ...prev,
          [`installments[${index}].${field}`]: error.errors[0].message,
        }));
      }
    }
  };

  const addInstallment = () => {
    const lastInstallment = saleData.installments.at(-1);

    // Prevent adding if the last installment rate is empty or 0
    if (lastInstallment && lastInstallment.rate === 0) return;

    // Calculate total installments sum
    const totalInstallments = saleData.installments.reduce(
      (acc, installment) => acc + installment.rate!,
      0
    );

    // Prevent adding a new installment if total installment sum >= total price
    if (totalInstallments >= saleData.totalPrice!) return;

    setSaleData((prev) => ({
      ...prev,
      installments: [
        ...prev.installments,
        {
          date: new Date().toISOString().split('T')[0],
          rate: 0,
          paymentMethod: 'cash',
        },
      ],
    }));
  };

  const submitHandler = async () => {
    try {
      // Generate a unique UUID for the purchase
      const saleId = uuid();

      // Create a new purchase object with the generated UUID
      const saleWithId = {
        ...saleData,
        id: saleId, // Add the unique UUID
      };

      // Validate the entire form
      const validatedData = SaleSchema.parse(saleWithId);

      // If validation passes, proceed with submission
      const resp = await window.electron.addSales(validatedData);
      setShowForm();
      console.log('Response on render side:', resp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a key-value pair for easier display
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            // Handle errors for the `installments` array
            if (err.path[0] === 'installments') {
              const installmentIndex = err.path[1]; // Index of the installment
              const fieldName = err.path[2]; // Field name (e.g., 'rate', 'paymentMethod')
              errorMap[`installments[${installmentIndex}].${fieldName}`] = err.message;
            } else {
              // Handle errors for other fields
              errorMap[err.path.join('.')] = err.message;
            }
          }
        });
        setErrors(errorMap);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleInstallmentDateChange = (index: number, value: string) => {
    setSaleData(prev => {
      const newInstallments = [...prev.installments];
      newInstallments[index] = {
        ...newInstallments[index],
        date: value
      };
      return { ...prev, installments: newInstallments };
    });

    // Validate the date
    try {
      const dateSchema = SaleSchema.shape.installments.unwrap().element.shape.date;
      dateSchema.parse(value);
      setErrors(prev => ({
        ...prev,
        [`installments[${index}].date`]: ''
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [`installments[${index}].date`]: error.errors[0].message
        }));
      }
    }
  };

  React.useEffect(() => {
    // Calculate the total price based on the price, tax, discount, and quantity
    const calculatedTotalPrice = calculateTotalPrice(
      saleData.price,
      saleData.tax,
      saleData.discount,
      saleData.quantity
    );

    // Calculate the total installments
    const totalInstallments = saleData.installments.reduce(
      (acc, installment) => acc + installment.rate!,
      0
    );

    const pendingAmount = calculatedTotalPrice - totalInstallments;

    // Update purchase data with pending amount and total price
    setPendingPaymentAmount(pendingAmount);
    setSaleData((prev) => ({
      ...prev,
      totalPrice: calculatedTotalPrice,
      pending: pendingAmount > 0 ? pendingAmount : 0,
      paymentStatus: pendingAmount == 0 ? 'paid' : prev.paymentStatus,
    }));
  }, [
    saleData.price,
    saleData.quantity,
    saleData.tax,
    saleData.discount,
    saleData.installments,
    pendingPaymentAmount,
  ]);

  React.useEffect(() => {
    if (isInstallment) {
      setSaleData((prev) => ({
        ...prev,
        paymentMethod: 'installment',
        paymentStatus: 'pending',
      }));
    }
    if (saleData.paymentStatus == 'paid') setSaleData((prev) => ({ ...prev, pending: 0 }));
    if (saleData.paymentStatus !== 'paid')
      setSaleData((prev) => ({ ...prev, pending: pendingPaymentAmount }));
  }, [isInstallment, pendingPaymentAmount]);

  return (
    <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-xl left-0 select-none">
      <div className="lg:w-8/12 md:w-11/12  mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between ">
            <h1 className="text-3xl">Add Sale</h1>
            <motion.div whileTap={{ scale: 0.8 }}>
              <button
                className="bg-zinc-800 p-2 font-semibold rounded-lg border border-white/20"
                onClick={() => setShowForm()}
              >
                <RxCross2 color="white" />
              </button>
            </motion.div>
          </div>
          <Input
            name="productName"
            value={saleData.productName}
            onChange={handleChange}
            label="Product Name"
            type="text"
          />
          {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Input
              name="price"
              value={saleData.price || ''}
              onChange={handleChange}
              label="Price"
              type="number"
            />
            <Input
              name="quantity"
              value={saleData.quantity || ''}
              onChange={handleChange}
              label="Quantity"
              type="number"
            />
            <Input
              name="discount"
              value={saleData.discount || ''}
              onChange={handleChange}
              label="Discount%"
              type="number"
            />
            <Input
              name="tax"
              value={saleData.tax || ''}
              onChange={handleChange}
              label="Tax"
              type="number"
            />
            <div>
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

              {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}

              {errors.tax && <p className="text-red-500 text-sm">{errors.tax}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Input
                name="supplier"
                value={saleData.supplier}
                onChange={handleChange}
                label="Supplier"
                type="text"
              />
              <Input
                name="orderingDate"
                value={saleData.orderingDate}
                onChange={handleChange}
                label="Ordering Date"
                type="date"
                style=""
              />
            </div>
            <div>
              {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}

              {errors.orderingDate && <p className="text-red-500 text-sm">{errors.orderingDate}</p>}
            </div>
          </div>
          <div className="flex-col gap-2 w-full">
            <div className="flex w-full gap-2">
              <Input
                name="supplierContact"
                value={saleData.supplierContact}
                onChange={handleChange}
                label="Supplier Ph. Number"
                type="text"
                placeholder="Enter Phone Number"
                style="w-full"
              />
              <Input
                name="supplierEmail"
                value={saleData.supplierEmail}
                onChange={handleChange}
                label="Supplier Contact Email"
                type="text"
                placeholder="Enter Email"
                style="w-full"
              />
            </div>
            <div>
              {errors.supplierContact && (
                <p className="text-red-500 text-sm">{errors.supplierContact}</p>
              )}
              {errors.supplierEmail && (
                <p className="text-red-500 text-sm">{errors.supplierEmail}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <p>Supplier Address</p>
              <textarea
                className="max-h-24 min-h-24 focus:outline-none w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
                name="supplierAddress"
                value={saleData.supplierAddress}
                onChange={handleChange}
              />
              {errors.supplierAddress && (
                <p className="text-red-500 text-sm">{errors.supplierAddress}</p>
              )}
            </div>
            <div className="w-full">
              <p>Shipping Address</p>
              <textarea
                className="max-h-24 min-h-24 focus:outline-none w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
                name="shippingAddress"
                value={saleData.shippingAddress}
                onChange={handleChange}
              />
              {errors.shippingAddress && (
                <p className="text-red-500 text-sm">{errors.shippingAddress}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-full">
              <label htmlFor="paymentMethod">Payment Status</label>
              <div className="w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm">
                <select
                  name="paymentStatus"
                  value={saleData.paymentStatus}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 focus:outline-none"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className={`w-full`}>
              <label htmlFor="paymentMethod">Payment Mode</label>
              <div className="w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm">
                <select
                  disabled={isInstallment}
                  name="paymentMethod"
                  value={saleData.paymentMethod}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 focus:outline-none"
                >
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="bankTransfer">Bank Transfer</option>
                  <option value="upi">UPI</option>
                  <option value="installment">Installment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="paymentMethod">Is Installments</label>
            <Input
              type="checkbox"
              onChange={() => {
                setIsInstallment(!isInstallment);
              }}
              style="w-fit scale-[1.8] ms-1 mt-2 accent-violet-500  "
            />
          </div>

          {isInstallment && (
            <div className="flex flex-col items-end mb-4">
              <div className="w-full flex justify-between items-center">
                <div />
                <motion.div whileTap={{ scale: 0.8 }}>
                  <button
                    className="bg-zinc-800 p-2 font-semibold rounded-lg border border-white/20"
                    onClick={addInstallment}
                  >
                    <FaPlus color="white" />
                  </button>
                </motion.div>
              </div>
              {saleData.installments.map((inst, index) => (
                <div className="w-full my-2" key={index}>
                  <div className="flex gap-2">
                    <Input
                      value={inst.rate || ''}
                      type="number"
                      placeholder='Enter Amount'
                      onChange={(e) =>
                        handleInstallmentChange(index, Number(e.target.value), 'rate')
                      }
                      label={`Installment ${index + 1} Amount`}
                    />
                    <div className="flex-1">
                      <Input
                        value={inst.date}
                        onChange={(e) => handleInstallmentDateChange(index, e.target.value)}
                        label="Payment Date"
                        type="date"
                      />
                      {errors[`installments[${index}].date`] && (
                        <p className="text-red-500 text-sm">
                          {errors[`installments[${index}].date`]}
                        </p>
                      )}
                    </div>

                    <div className="w-1/4  px-2  flex justify-center items-end ">
                      <select
                        value={inst.paymentMethod}
                        onChange={(e) =>
                          handleInstallmentChange(index, e.target.value, 'paymentMethod')
                        }
                        className=" h-fit  bg-zinc-800 focus:border-none p-2 rounded-sm focus:outline-none w-full"
                      >
                        <option value="null">Credit</option>
                        <option value="cash">Cash</option>
                        <option value="cheque">Cheque</option>
                        <option value="upi">UPI</option>
                      </select>
                    </div>
                  </div>
                  {errors[`installments[${index}].rate`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`installments[${index}].rate`]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <Input
            name="totalPrice"
            value={saleData.totalPrice || ''}
            onChange={handleChange}
            label="Total Price"
            type="number"
            placeholder="Total Price will be calculated here"
            style="w-full"
          />
          {saleData.paymentStatus !== 'paid' && (
            <Input
              name="pending"
              value={saleData.pending || ''}
              onChange={handleChange}
              label="Pending Amount"
              type="number"
              placeholder="Pending amount"
              style="w-full"
            />
          )}

          <Button onPress={submitHandler} label="Create" />
        </div>
      </div>
    </div>
  )
}

export default SaleForm
