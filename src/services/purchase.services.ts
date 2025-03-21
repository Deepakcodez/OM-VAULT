import db from './database.table'
import { randomUUID } from 'crypto'

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

// Helper function to sanitize purchase data
const sanitizePurchase = (purchase:Partial<Purchase>):Purchase => ({
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

// Get All Purchases
export const getAllPurchases = () => {
  return db.prepare('SELECT * FROM purchases').all()
}
// export const getFilterPurchases = (searchQuery: string) => {
//   try {
//     // Prepare the SQL query with a parameterized search term
//     const stmt = db.prepare('SELECT * FROM purchases WHERE productName LIKE ?')

//     // Execute the query with the search term wrapped in wildcards
//     const results = stmt.all(`%${searchQuery}%`)

//     return results
//   } catch (error) {
//     console.error('Error fetching filtered purchases:', error)
//     return [] // Return an empty array in case of an error
//   }
// }

// Get Purchase by ID


export const getFilterPurchases = (searchQuery: string, year?: string) => {
  console.log("sear query",searchQuery,"year",year)
  try {
    // Base query to filter by product name
    let query = 'SELECT * FROM purchases WHERE productName LIKE ?';
    const params: any[] = [`%${searchQuery}%`];

    // Add year filter if provided
    if (year) {
      query += ' AND strftime(\'%Y\', orderingDate) = ?';
      params.push(year.toString());
    }

    // Log the query and parameters for debugging
    console.log('Executing query:', query);
    console.log('Query parameters:', params);

    // Prepare and execute the query
    const stmt = db.prepare(query);
    const results = stmt.all(...params);

    return results;
  } catch (error) {
    console.error('Error fetching filtered purchases:', error);
    return []; // Return an empty array in case of an error
  }
};   


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
    const installments = purchase.installments  ? JSON.parse(purchase.installments) : []

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
