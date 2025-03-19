import { InstallmentType, SalesDataType } from '@renderer/types/types'
import * as XLSX from 'xlsx'

// Function to export sale data to an Excel file
export const exportSaleToExcel = (data:SalesDataType[]) => {
  // Map the sale data to a format suitable for Excel
  const dataToExport = data.map((sale) => {
    const installments = JSON.parse(sale.installments || '[]') // Parse installments

    return {
      ID: sale.id,
      'Product Name': sale.productName,
      Price: sale.price,
      Quantity: sale.quantity,
      'Discount (%)': sale.discount,
      'Tax (%)': sale.tax,
      'Total Price': sale.totalPrice,
      'Pending Amount': sale.pending,
      'Payment Status': sale.paymentStatus,
      'Payment Method': sale.paymentMethod,
      Installments: installments
        .map((inst:InstallmentType) => `${inst.date}: ${inst.rate} (${inst.paymentMethod})`)
        .join(' | '),
      'Ordering Date': sale.orderingDate,
      Supplier: sale.supplier,
      'Supplier Contact': sale.supplierContact,
      'Supplier Email': sale.supplierEmail,
      'Supplier Address': sale.supplierAddress,
      'Shipping Address': sale.shippingAddress
    }
  })

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport)
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'sales')

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, 'sales.xlsx')
}
