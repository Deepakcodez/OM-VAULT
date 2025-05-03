import { ipcMain } from "electron";
import { getAllSaleByYear, getAllSales, getFiltersale, getSalesByPaymentMethod, getSalesByPaymentMethodAndYear, insertSales } from "../../services/sales.services";

export const SaleHandler = ()=>{

    ipcMain.handle('addSales', async (_, purchaseData) => {
        console.log('from main process sales data', purchaseData)
        try {
          const response = insertSales(purchaseData);
          console.log(response, "responses sales")
          return { success: true, message: 'Sales added successfully' };
        } catch (error) {
          console.error('Error adding purchase:', error);
          return { success: false, message: 'Failed to add purchase' };
        }
      });
    
    
      ipcMain.handle('getFilterSale', async (_, searchQuery, year?: string) => {
        return getFiltersale(searchQuery, year);
      })
    
      ipcMain.handle('getAllSales', async (_, year) => {
        try {
          // Trim and normalize the year parameter
          const normalizedYear = String(year).trim();
    
          // Check if year is 'all' (case-insensitive)
          if (+year === 0) {
            return await getAllSales(); // Ensure this function is awaited
          }
          return getAllSaleByYear(normalizedYear); // Ensure this function is awaited
        } catch (error) {
          console.error('Error in getAllPurchases IPC handler:', error);
          return [];
        }
      });
    
     
      ipcMain.handle("getSalesByPaymentMethod", async (__, paymentMethod, year) => {
        const normalizedYear = String(year).trim();
        if (+year !== 0) {
          return getSalesByPaymentMethodAndYear(paymentMethod, normalizedYear);
        }
    
        return getSalesByPaymentMethod(paymentMethod);
    
      })
}