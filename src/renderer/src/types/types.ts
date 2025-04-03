type InstallmentType = {
  date: string
  rate: number | string | undefined
  paymentMethod: 'credit' | 'debit' | 'cash' | 'upi' | 'cheque' | 'bankTransfer'
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

type SalesDataType = {
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


type Company = {
  id: string
  companyName: string
  description?: string | null
  companyLogoUrl?: string | null
  address1?: string | null
  address2?: string | null
  address3?: string | null
  address4?: string | null
  email1?: string | null
  email2?: string | null
  phone1?: string | null
  phone2?: string | null
  createdAt?: string
  updatedAt?: string
}



export type { InstallmentType, Company, PurchaseDataType, TableHeadingsTypes, SalesDataType }
