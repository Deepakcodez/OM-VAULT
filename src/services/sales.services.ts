import db from './database.table'
import { randomUUID } from 'crypto'
// Helper function to sanitize sale data
const sanitizeSales = (sale: any) => ({
  id: sale.id ?? randomUUID(), // Generate UUID if missing
  productName: String(sale.productName || ''),
  price: sale.price ?? null,
  quantity: sale.quantity ?? null,
  discount: sale.discount ?? null,
  tax: sale.tax ?? null,
  supplier: sale.supplier ? String(sale.supplier) : null,
  supplierContact: sale.supplierContact ? String(sale.supplierContact) : null,
  supplierEmail: sale.supplierEmail ? String(sale.supplierEmail) : null,
  supplierAddress: sale.supplierAddress ? String(sale.supplierAddress) : null,
  shippingAddress: sale.shippingAddress ? String(sale.shippingAddress) : null,
  paymentStatus: sale.paymentStatus ? String(sale.paymentStatus) : null,
  paymentMethod: sale.paymentMethod ? String(sale.paymentMethod) : null,
  orderingDate: sale.orderingDate ? String(sale.orderingDate) : null,
  isInstallment: sale.isInstallment ? 1 : 0, // Convert boolean to 1/0
  installments: sale.installments ? JSON.stringify(sale.installments) : null, // Store JSON string
  pending: sale.pending ?? null,
  totalPrice: sale.totalPrice ?? null
})



type Installment = {
  amount: number;
  dueDate: string;
  status: string;
};

type sale = {
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

// Insert sale
export const insertSales = (sale: any) => {
  const data = sanitizeSales(sale)
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



// Get All sales
export const getAllSales = () => {
  return db.prepare('SELECT * FROM sales').all()
}
export const getAllSaleByYear = (year: string) => {
  try {
    // Fetch all purchases from the database
    const result = db.prepare('SELECT * FROM sales').all();
    // Filter results where orderingDate includes the specified year
    const filteredResult = result.filter((sale: any) => {
      // Ensure orderingDate is a string and includes the year
      return sale.orderingDate && sale.orderingDate.includes(year);
    });
    return filteredResult;

  } catch (error) {
    console.error('Error fetching purchases:', error);
    return []; // Return an empty array in case of an error
  }
};
// Get sale by ID
export const getsaleById = (id: string) => {
  return db.prepare('SELECT * FROM sales WHERE id = ?').get(id)
}



export const getFiltersale = (searchQuery: string, year?: string) => {
  console.log('Search query:', searchQuery, 'Year:', year)

  try {
    const stmt = db.prepare('SELECT * FROM sales WHERE productName LIKE ?')

    const results = stmt.all(`%${searchQuery}%`)
    if (year && year!=JSON.stringify(0)) {
      return results.filter((sale: any) =>
        sale.orderingDate.includes(new Date(year).getFullYear())
      )
    } else {
      return results
    }
  } catch (error) {
    console.error('Error fetching filtered purchases:', error)
    return [] // Return an empty array in case of an error
  }
}

// export const getFiltersale = (searchQuery: string) => {
//   try {
//     // Prepare the SQL query with a parameterized search term
//     const stmt = db.prepare('SELECT * FROM sales WHERE productName LIKE ?')

//     // Execute the query with the search term wrapped in wildcards
//     const results = stmt.all(`%${searchQuery}%`)

//     return results
//   } catch (error) {
//     console.error('Error fetching filtered sales:', error)
//     return [] // Return an empty array in case of an error
//   }
// }


export const getSalesByPaymentMethod = (paymentMethod: string) => {
  console.log('inside db of sales by payment method')
  console.log(paymentMethod)
  try {
    const stmt = db.prepare('SELECT * FROM sales WHERE paymentMethod = ?')
    const data = stmt.all(paymentMethod)
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching sales by payment method:', error)
    return []
  }
}

// Update sale
export const updatesale = (sale: any) => {
  const data = sanitizeSales(sale)
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


export const addInstallmentSales = (saleId: string, newInstallment: Installment) => {
  try {

    // Fetch the existing sale
    const sale = db.prepare('SELECT * FROM sales WHERE id = ?').get(saleId) as sale
    console.log(sale, 'from services page inside sales ')
    if (!sale || !sale) {
      throw new Error('sale not found')
    }

    // Parse the existing installments
    const installments = sale.installments  ? JSON.parse(sale.installments) : []

    // Add the new installment
    installments.push(newInstallment)

    // Update the sale with the new installments
    const stmt = db.prepare('UPDATE sales SET installments = ? WHERE id = ?')
    stmt.run(JSON.stringify(installments), saleId)

    return { success: true, message: 'Installment added successfully' }
  } catch (error) {
    console.error('Error adding installment:', error)
    return { success: false, message: 'Failed to add installment' }
  }
}

// Delete sale
export const deletesale = (id: string) => {
  const stmt = db.prepare('DELETE FROM sales WHERE id = ?')
  return stmt.run(id)
}
