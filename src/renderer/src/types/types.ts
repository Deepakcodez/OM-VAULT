type InstallmentType = {
  date: string
  rate: number | null
  paymentMethod: string
}

type PurchaseDataType = {
  id: string
  productName: string
  price: number | null
  quantity: number | null
  discount: number | null
  tax: number | null
  supplier: string
  supplierContact: string
  supplierEmail: string
  supplierAddress: string
  shippingAddress: string
  paymentStatus: 'pending' | 'paid' | 'cancelled'
  paymentMethod: 'cash' | 'creditCard' | 'bankTransfer' | 'upi' | 'cheque' | 'installment' | 'other'
  orderingDate: string
  isInstallment: boolean
  installments: any
  pending?: number
  totalPrice?: number
}

type TableHeadingsTypes = {
  key: string
  label: string
}

export type { InstallmentType, PurchaseDataType, TableHeadingsTypes }
