type InstallmentType = {
  date: string;
  rate: number | null;
  paymentMethod : string;
};

type PurchaseDataType = {
  id: string;
  productName: string;
  price: number | null;
  quantity: number | null;
  discount: number | null;
  tax: number | null;
  supplier: string;
  supplierContact: string;
  supplierEmail: string;
  supplierAddress: string;
  shippingAddress: string;
  paymentStatus: string;
  paymentMethod: string;
  orderingDate: string;
  installments: InstallmentType[];
  pending? : number
  totalPrice?: number ;
};

type TableHeadingsTypes = {
    key :string;
    label :string;
}

export type { InstallmentType, PurchaseDataType, TableHeadingsTypes };
