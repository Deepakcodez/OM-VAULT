import db from "./database.table";
import { randomUUID } from 'crypto';
// Helper function to sanitize purchase data
const sanitizeSales = (purchase: any) => ({
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
export const insertSales = (purchase: any) => {
  const data = sanitizeSales(purchase);
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
  `);
  return stmt.run(data);
};

// Get All Purchases
export const getAllPurchases = () => {
  return db.prepare('SELECT * FROM sales').all();
};

// Get Purchase by ID
export const getPurchaseById = (id: string) => {
  return db.prepare('SELECT * FROM sales WHERE id = ?').get(id);
};

// Update Purchase
export const updatePurchase = (purchase: any) => {
  const data = sanitizeSales(purchase);
  const stmt = db.prepare(`
    UPDATE sales SET
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

// Delete Purchase
export const deletePurchase = (id: string) => {
  const stmt = db.prepare('DELETE FROM sales WHERE id = ?');
  return stmt.run(id);
};
