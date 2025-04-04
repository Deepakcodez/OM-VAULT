import db from './database.table'
import { randomUUID } from 'crypto'

type Installment = {
  amount: number
  dueDate: string
  status: string
}

type Purchase = {
  id: string
  productName: string
  price: number | null
  quantity: number | null
  discount: number | null
  tax: number | null
  supplier: string | null
  supplierContact: string | null
  supplierEmail: string | null
  supplierAddress: string | null
  shippingAddress: string | null
  paymentStatus: string | null
  paymentMethod: string | null
  orderingDate: string | null
  isInstallment: number 
  installments: string | null 
  pending: number | null
  totalPrice: number | null
}

// Helper function to sanitize purchase data
const sanitizePurchase = (purchase: Partial<Purchase>): Purchase => ({
  id: purchase.id ?? randomUUID(), 
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

// Insert Purchase
export const insertPurchase = (purchase: any) => {
  const data = sanitizePurchase(purchase)
  const stmt = db.prepare(`
    INSERT INTO purchases (
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


export const getAllPurchases = () => {
  

  try {
    // Fetch all purchases from the database
   return db.prepare('SELECT * FROM purchases').all();

  } catch (error) {
    console.error('Error fetching purchases:', error);
    return []; // Return an empty array in case of an error
  }
};

// Get All Purchases
export const getAllPurchasesByYear = (year: string) => {
  try {
    // Fetch all purchases from the database
    const result = db.prepare('SELECT * FROM purchases').all();
    // Filter results where orderingDate includes the specified year
    const filteredResult = result.filter((purchase: any) => {
      // Ensure orderingDate is a string and includes the year
      return purchase.orderingDate && purchase.orderingDate.includes(year);
    });
    return filteredResult;

  } catch (error) {
    console.error('Error fetching purchases:', error);
    return []; // Return an empty array in case of an error
  }
};

export const getFilterPurchases = (searchQuery: string, year?: string) => {
  console.log('Search query:', searchQuery, 'Year:', year)

  try {
    const stmt = db.prepare('SELECT * FROM purchases WHERE productName LIKE ?')

    const results = stmt.all(`%${searchQuery}%`)
    console.log('Results:', results)
    if (year  && year!=JSON.stringify(0)) {
      return results.filter((purchase: any) =>
        purchase.orderingDate.includes(new Date(year).getFullYear())
      )
    } else {
      return results
    }
  } catch (error) {
    console.error('Error fetching filtered purchases:', error)
    return [] // Return an empty array in case of an error
  }
}

export const getPurchaseById = (id: string) => {
  return db.prepare('SELECT * FROM purchases WHERE id = ?').get(id)
}

export const getPurchaseByPaymentMethod = (paymentMethod: string) => {
  try {
    const stmt = db.prepare('SELECT * FROM purchases WHERE paymentMethod = ?')
    const data = stmt.all(paymentMethod)
    return data
  } catch (error) {
    console.error('Error fetching purchases by payment method:', error)
    return []
  }
}
export const getPurchaseByPaymentMethodAndYear = (paymentMethod: string, year?:string) => {
  try {
    // Fetch all purchases from the database
    const stmt = db.prepare('SELECT * FROM purchases WHERE paymentMethod = ?')
    const result = stmt.all(paymentMethod)
    
    // Filter results where orderingDate includes the specified year
    const filteredResult = result.filter((purchase: any) => {
      // Ensure orderingDate is a string and includes the year
      return purchase.orderingDate && purchase.orderingDate.includes(year);
    });
    return filteredResult;

  } catch (error) {
    console.error('Error fetching purchases:', error);
    return []; // Return an empty array in case of an error
  }
}

// Update Purchase
export const updatePurchase = (purchase: any) => {
  const data = sanitizePurchase(purchase)
  const stmt = db.prepare(`
    UPDATE purchases SET
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

// Add Installment to Purchase
export const addInstallment = (purchaseId: string, newInstallment: Installment) => {
  try {
    // Fetch the existing purchase
    const purchase = db.prepare('SELECT * FROM purchases WHERE id = ?').get(purchaseId) as Purchase
    console.log(newInstallment, 'from services page')
    if (!purchase || !purchase) {
      throw new Error('Purchase not found')
    }

    // Parse the existing installments
    const installments = purchase.installments ? JSON.parse(purchase.installments) : []

    // Add the new installment
    installments.push(newInstallment)

    // Update the purchase with the new installments
    const stmt = db.prepare('UPDATE purchases SET installments = ? WHERE id = ?')
    stmt.run(JSON.stringify(installments), purchaseId)

    return { success: true, message: 'Installment added successfully' }
  } catch (error) {
    console.error('Error adding installment:', error)
    return { success: false, message: 'Failed to add installment' }
  }
}

// Delete Purchase
export const deletePurchase = (id: string) => {
  const stmt = db.prepare('DELETE FROM purchases WHERE id = ?')
  return stmt.run(id)
}
