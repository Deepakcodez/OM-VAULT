import * as XLSX from 'xlsx'

// Function to export purchase data to an Excel file
export const exportPurchasesToExcel = (data) => {
  // Map the purchase data to a format suitable for Excel
  const dataToExport = data.map((purchase) => {
    const installments = JSON.parse(purchase.installments || '[]') // Parse installments

    return {
      ID: purchase.id,
      'Product Name': purchase.productName,
      Price: purchase.price,
      Quantity: purchase.quantity,
      'Discount (%)': purchase.discount,
      'Tax (%)': purchase.tax,
      'Total Price': purchase.totalPrice,
      'Pending Amount': purchase.pending,
      'Payment Status': purchase.paymentStatus,
      'Payment Method': purchase.paymentMethod,
      Installments: installments
        .map((inst) => `${inst.date}: ${inst.rate} (${inst.paymentMethod})`)
        .join(' | '),
      'Ordering Date': purchase.orderingDate,
      Supplier: purchase.supplier,
      'Supplier Contact': purchase.supplierContact,
      'Supplier Email': purchase.supplierEmail,
      'Supplier Address': purchase.supplierAddress,
      'Shipping Address': purchase.shippingAddress
    }
  })

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport)
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases')

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, 'purchases.xlsx')
}
