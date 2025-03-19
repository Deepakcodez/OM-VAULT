import db from './database.table'
import { randomUUID } from 'crypto'
// Helper function to sanitize purchase data
const sanitizeSales = (purchase: any) => ({
  id: purchase.id ?? randomUUID(), // Generate UUID if missing
  productName: String(purchase.productName || ''),
  price: purchase.price ?? null,
  quantity: purchase.quantity ?? null,
  discount: purchase.discount ?? null,
  tax: purchase.tax ?? null,
  supplier: purchase.supplier ? String(purchase.supplier) : null,
  supplierContact: purchase.supplierContact ? String(purchase.supplierContact) : null,
  supplierEmail: purchase.supplierEmail ? String(purchase.supplierEmail) : null,
  supplierAddress: purchase.supplierAddress ? String(purchase.supplierAddress) : null,
  shippingAddress: purchase.shippingAddress ? String(purchase.shippingAddress) : null,
  paymentStatus: purchase.paymentStatus ? String(purchase.paymentStatus) : null,
  paymentMethod: purchase.paymentMethod ? String(purchase.paymentMethod) : null,
  orderingDate: purchase.orderingDate ? String(purchase.orderingDate) : null,
  isInstallment: purchase.isInstallment ? 1 : 0, // Convert boolean to 1/0
  installments: purchase.installments ? JSON.stringify(purchase.installments) : null, // Store JSON string
  pending: purchase.pending ?? null,
  totalPrice: purchase.totalPrice ?? null
})



type Installment = {
  amount: number;
  dueDate: string;
  status: string;
};

type Purchase = {
  id: string;
  productName: string;
  price: number | null;
  quantity: number | null;
  discount: number | null;
  tax: number | null;
  supplier: string | null;
  supplierContact: string | null;
  supplierEmail: string | null;
  supplierAddress: string | null;
  shippingAddress: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  orderingDate: string | null;
  isInstallment: number; // 1 or 0
  installments: string | null; // JSON string
  pending: number | null;
  totalPrice: number | null;
};

// Insert Purchase
export const insertSales = (purchase: any) => {
  const data = sanitizeSales(purchase)
  console.log('inside db of sales insesrt')
  const stmt = db.prepare(`
    INSERT INTO sales (
      id, productName, price, quantity, discount, tax, supplier, supplierContact,
      supplierEmail, supplierAddress, shippingAddress, paymentStatus, paymentMethod,
      orderingDate, isInstallment, installments, pending, totalPrice
    ) VALUES (
      @id, @productName, @price, @quantity, @discount, @tax, @supplier, @supplierContact,
      @supplierEmail, @supplierAddress, @shippingAddress, @paymentStatus, @paymentMethod,
      @orderingDate, @isInstallment, @installments, @pending, @totalPrice
    )
  `)

  return stmt.run(data)
}

// Get All Purchases
export const getAllSales = () => {
  return db.prepare('SELECT * FROM sales').all()
}

// Get Purchase by ID
export const getPurchaseById = (id: string) => {
  return db.prepare('SELECT * FROM sales WHERE id = ?').get(id)
}

export const getSalesByPaymentMethod = (paymentMethod: string) => {
  console.log('inside db of sales by payment method')
  console.log(paymentMethod)
  try {
    const stmt = db.prepare('SELECT * FROM sales WHERE paymentMethod = ?')
    const data = stmt.all(paymentMethod)
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching purchases by payment method:', error)
    return []
  }
}

// Update Purchase
export const updatePurchase = (purchase: any) => {
  const data = sanitizeSales(purchase)
  const stmt = db.prepare(`
    UPDATE sales SET
      productName = @productName, price = @price, quantity = @quantity, discount = @discount,
      tax = @tax, supplier = @supplier, supplierContact = @supplierContact, supplierEmail = @supplierEmail,
      supplierAddress = @supplierAddress, shippingAddress = @shippingAddress,
      paymentStatus = @paymentStatus, paymentMethod = @paymentMethod,
      orderingDate = @orderingDate, isInstallment = @isInstallment,
      installments = @installments, pending = @pending, totalPrice = @totalPrice
    WHERE id = @id
  `)
  return stmt.run(data)
}


export const addInstallmentSales = (purchaseId: string, newInstallment: Installment) => {
  try {

    // Fetch the existing purchase
    const purchase = db.prepare('SELECT * FROM sales WHERE id = ?').get(purchaseId) as Purchase
    console.log(purchase, 'from services page inside sales ')
    if (!purchase || !purchase) {
      throw new Error('Purchase not found')
    }

    // Parse the existing installments
    const installments = purchase.installments  ? JSON.parse(purchase.installments) : []

    // Add the new installment
    installments.push(newInstallment)

    // Update the purchase with the new installments
    const stmt = db.prepare('UPDATE sales SET installments = ? WHERE id = ?')
    stmt.run(JSON.stringify(installments), purchaseId)

    return { success: true, message: 'Installment added successfully' }
  } catch (error) {
    console.error('Error adding installment:', error)
    return { success: false, message: 'Failed to add installment' }
  }
}

// Delete Purchase
export const deletePurchase = (id: string) => {
  const stmt = db.prepare('DELETE FROM sales WHERE id = ?')
  return stmt.run(id)
}
