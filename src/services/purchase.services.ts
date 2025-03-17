import db from "./database.table";
import { randomUUID } from 'crypto';
// Helper function to sanitize purchase data
const sanitizePurchase = (purchase: any) => ({
  id: purchase.id ?? randomUUID(), // Generate UUID if missing
  productName: String(purchase.productName || ""),
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
});

// Insert Purchase
export const insertPurchase = (purchase: any) => {
  const data = sanitizePurchase(purchase);
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
  `);
  return stmt.run(data);
};

// Get All Purchases
export const getAllPurchases = () => {
  return db.prepare('SELECT * FROM purchases').all();
};

// Get Purchase by ID
export const getPurchaseById = (id: string) => {
  return db.prepare('SELECT * FROM purchases WHERE id = ?').get(id);
};

export const getPurchaseByPaymentMethod = (paymentMethod: string) => {
  try {
    const stmt = db.prepare("SELECT * FROM purchases WHERE paymentMethod = ?");
    const data = stmt.all(paymentMethod);
    return data;
  } catch (error) {
    console.error("Error fetching purchases by payment method:", error);
    return [];
  }
};

// Update Purchase
export const updatePurchase = (purchase: any) => {
  const data = sanitizePurchase(purchase);
  const stmt = db.prepare(`
    UPDATE purchases SET
      productName = @productName, price = @price, quantity = @quantity, discount = @discount,
      tax = @tax, supplier = @supplier, supplierContact = @supplierContact, supplierEmail = @supplierEmail,
      supplierAddress = @supplierAddress, shippingAddress = @shippingAddress,
      paymentStatus = @paymentStatus, paymentMethod = @paymentMethod,
      orderingDate = @orderingDate, isInstallment = @isInstallment,
      installments = @installments, pending = @pending, totalPrice = @totalPrice
    WHERE id = @id
  `);
  return stmt.run(data);
};


// Add Installment to Purchase
export const addInstallment = (purchaseId: string, newInstallment: any) => {
  try {
    // Fetch the existing purchase
    const purchase = db.prepare('SELECT * FROM purchases WHERE id = ?').get(purchaseId);
    console.log(purchase, "from services page");
    if (!purchase) {
      throw new Error('Purchase not found');
    }

    // Parse the existing installments
    const installments = purchase.installments ? JSON.parse(purchase.installments) : [];

    // Add the new installment
    installments.push(newInstallment);

    // Update the purchase with the new installments
    const stmt = db.prepare('UPDATE purchases SET installments = ? WHERE id = ?');
    stmt.run(JSON.stringify(installments), purchaseId);

    return { success: true, message: 'Installment added successfully' };
  } catch (error) {
    console.error('Error adding installment:', error);
    return { success: false, message: 'Failed to add installment' };
  }
};

// Delete Purchase
export const deletePurchase = (id: string) => {
  const stmt = db.prepare('DELETE FROM purchases WHERE id = ?');
  return stmt.run(id);
};
