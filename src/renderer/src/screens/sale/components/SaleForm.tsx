import React, { useState } from "react";
import { Input } from "../../../components/ui";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import Button from "../../../components/ui/Button";
import { useFormStore } from "../../../state_manager/FormState";
import { RxCross2 } from "react-icons/rx";
import { PurchaseDataType } from "../../../types/types";
import { calculateTotalPrice } from "../../../libs/utilityFunc";
import { v4 as uuid } from "uuid";

const SaleForm: React.FC = () => {
  const { setShowForm } = useFormStore();
  const [isInstallment, setIsInstallment] = useState<boolean>(false);
  const [pendingPaymentAmount, setPendingPaymentAmount] = useState<number>(0);
  const [purchaseData, setPurchaseData] = useState<PurchaseDataType>({
    id: "",
    productName: "",
    price: 0,
    quantity: 0,
    discount: 0,
    tax: 0,
    supplier: "",
    supplierContact: "",
    supplierEmail: "",
    supplierAddress: "",
    shippingAddress: "",
    paymentStatus: "pending",
    paymentMethod: "other",
    orderingDate: "",
    isInstallment: isInstallment,
    installments: [
      {
        date: new Date().toISOString().split("T")[0],
        rate: 0,
        paymentMethod: "cash"
      }
    ],
    pending: 0,
    totalPrice: 0
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPurchaseData((prev) => ({ ...prev, id: uuid(), [name]: value }));
    console.log(purchaseData);
  };

  const handleInstallmentChange = (
    index: number,
    value: number | string,
    field: "rate" | "paymentMethod"
  ) => {
    setPurchaseData((prev) => {
      const newInstallments = [...prev.installments];
      if (field === "rate") {
        newInstallments[index].rate = value as number;
      } else {
        newInstallments[index].paymentMethod = value as string;
      }
      return { ...prev, installments: newInstallments };
    });
  };

  const addInstallment = () => {
    const lastInstallment = purchaseData.installments.at(-1);
    if (lastInstallment && lastInstallment.rate === 0) return; // Prevent adding if last installment rate is empty or 0

    setPurchaseData((prev) => ({
      ...prev,
      installments: [
        ...prev.installments,
        {
          date: new Date().toISOString().split("T")[0],
          rate: 0,
          paymentMethod: "cash"
        }
      ]
    }));
  };

  const submitHandler = async () => {
    if (
      !purchaseData.productName ||
      !purchaseData.price ||
      !purchaseData.quantity ||
      !purchaseData.supplier ||
      !purchaseData.supplierContact ||
      !purchaseData.supplierEmail ||
      !purchaseData.supplierAddress ||
      !purchaseData.shippingAddress ||
      !purchaseData.orderingDate
    ) {
      window.electronAPI.showCustomAlert("Please fill all the fields");
      return;
    }
    await window.electronAPI.onPurchaseData(purchaseData);
  };

  React.useEffect(() => {
    // Calculate the total price based on the price, tax, discount, and quantity
    const calculatedTotalPrice = calculateTotalPrice(
      purchaseData.price,
      purchaseData.tax,
      purchaseData.discount,
      purchaseData.quantity
    );

    // Calculate the total installments
    const totalInstallments = purchaseData.installments.reduce(
      (acc, installment) => acc + installment.rate!,
      0
    );

    const pendingAmount = calculatedTotalPrice - totalInstallments;
    setPendingPaymentAmount(pendingAmount);
    setPurchaseData((prev) => ({
      ...prev,
      totalPrice: calculatedTotalPrice,
      pending: pendingAmount > 0 ? pendingAmount : 0
    }));
  }, [
    purchaseData.price,
    purchaseData.quantity,
    purchaseData.tax,
    purchaseData.discount,
    purchaseData.installments
  ]);

  React.useEffect(() => {
    if (!isInstallment)
      setPurchaseData((prev) => ({ ...prev, paymentMethod: "cash" }));
    if (purchaseData.paymentStatus == "paid")
      setPurchaseData((prev) => ({ ...prev, pending: 0 }));
    if (purchaseData.paymentStatus !== "paid")
      setPurchaseData((prev) => ({ ...prev, pending: pendingPaymentAmount }));
  }, [isInstallment, purchaseData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between ">
        <h1 className="text-3xl">Add Purchase</h1>
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
        value={purchaseData.productName}
        onChange={handleChange}
        label="Product Name"
        type="text"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Input
          name="price"
          value={purchaseData.price || ""}
          onChange={handleChange}
          label="Price"
          type="number"
        />
        <Input
          name="quantity"
          value={purchaseData.quantity || ""}
          onChange={handleChange}
          label="Quantity"
          type="number"
        />
        <Input
          name="discount"
          value={purchaseData.discount || ""}
          onChange={handleChange}
          label="Discount%"
          type="number"
        />
        <Input
          name="tax"
          value={purchaseData.tax || ""}
          onChange={handleChange}
          label="Tax"
          type="number"
        />
      </div>
      <div className="flex gap-2">
        <Input
          name="supplier"
          value={purchaseData.supplier}
          onChange={handleChange}
          label="Supplier"
          type="text"
        />
        <Input
          name="orderingDate"
          value={purchaseData.orderingDate}
          onChange={handleChange}
          label="Ordering Date"
          type="date"
          style=""
        />
      </div>
      <div className="flex gap-2 w-full">
        <Input
          name="supplierContact"
          value={purchaseData.supplierContact}
          onChange={handleChange}
          label="Supplier Ph. Number"
          type="text"
          placeholder="Enter Phone Number"
          style="w-full"
        />
        <Input
          name="supplierEmail"
          value={purchaseData.supplierEmail}
          onChange={handleChange}
          label="Supplier Contact Email"
          type="text"
          placeholder="Enter Email"
          style="w-full"
        />
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <p>Supplier Address</p>
          <textarea
            className="max-h-24 min-h-24 focus:outline-none w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
            name="supplierAddress"
            value={purchaseData.supplierAddress}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p>Shipping Address</p>
          <textarea
            className="max-h-24 min-h-24 focus:outline-none w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm resize-none"
            name="shippingAddress"
            value={purchaseData.shippingAddress}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-full">
          <label htmlFor="paymentMethod">Payment Status</label>
          <div className="w-full pe-4 bg-zinc-800 border-b border-gray-300 py-2 px-2 rounded-sm">
            <select
              name="paymentStatus"
              value={purchaseData.paymentStatus}
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
              value={purchaseData.paymentMethod}
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
            setPurchaseData({ ...purchaseData, paymentMethod: "installment" });
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
          {purchaseData.installments.map((inst, index) => (
            <div className="w-full my-2" key={index}>
              <div className="flex gap-2">
                <Input
                  value={inst.rate || ""}
                  type="number"
                  onChange={(e) =>
                    handleInstallmentChange(
                      index,
                      Number(e.target.value),
                      "rate"
                    )
                  }
                  label={`Installment ${index + 1} Amount`}
                />
                <div className="w-1/4  px-2  flex justify-center items-end">
                  <select
                    value={inst.paymentMethod}
                    onChange={(e) =>
                      handleInstallmentChange(
                        index,
                        e.target.value,
                        "paymentMethod"
                      )
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
            </div>
          ))}
        </div>
      )}
      <Input
        name="totalPrice"
        value={purchaseData.totalPrice || ""}
        onChange={handleChange}
        label="Total Price"
        type="number"
        placeholder="Total Price will be calculated here"
        style="w-full"
      />
      <Input
        name="pending"
        value={purchaseData.pending || ""}
        onChange={handleChange}
        label="Pending Amount"
        type="number"
        placeholder="Pending amount"
        style="w-full"
      />

      <Button onPress={submitHandler} label="Create" />
    </div>
  );
};

export default SaleForm;
