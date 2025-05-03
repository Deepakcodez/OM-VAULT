import { ipcMain } from "electron";
import { deletePurchase, getAllPurchases, getAllPurchasesByYear, getFilterPurchases, getPurchaseById, getPurchaseByPaymentMethod, getPurchaseByPaymentMethodAndYear, insertPurchase, updatePurchase } from "../../services/purchase.services";

export const PurchaseHandler = () => {

    ipcMain.handle('addPurchase', async (_, purchaseData) => {
        console.log('from main process purchase data', purchaseData)
        try {
            insertPurchase(purchaseData);
            return { success: true, message: 'Purchase added successfully' };
        } catch (error) {
            console.error('Error adding purchase:', error);
            return { success: false, message: 'Failed to add purchase' };
        }
    });


    ipcMain.handle('getAllPurchases', async (_, year) => {

        try {
            // Trim and normalize the year parameter
            const normalizedYear = String(year).trim();

            // Check if year is 'all' (case-insensitive)
            if (+year === 0) {
                return await getAllPurchases(); // Ensure this function is awaited
            }
            return getAllPurchasesByYear(normalizedYear); // Ensure this function is awaited
        } catch (error) {
            console.error('Error in getAllPurchases IPC handler:', error);
            return [];
        }
    });


    ipcMain.handle('getFilterPurchases', async (_, searchQuery, year?: string) => {
        console.log(searchQuery, year, "searchQuery main")
        return getFilterPurchases(searchQuery, year);
    });

    ipcMain.handle('getPurchaseById', async (_, id) => {
        return getPurchaseById(id);
    });

    ipcMain.handle("getPurchaseByPaymentMethod", async (__, paymentMethod, year) => {
        const normalizedYear = String(year).trim();
        if (+year !== 0) {
            return getPurchaseByPaymentMethodAndYear(paymentMethod, normalizedYear);
        }
        // If year is 'all', return all purchases without filtering by year
        return getPurchaseByPaymentMethod(paymentMethod);
    })

    ipcMain.handle('updatePurchase', async (_, purchaseData) => {
        try {
            updatePurchase(purchaseData);
            return { success: true, message: 'Purchase updated successfully' };
        } catch (error) {
            console.error('Error updating purchase:', error);
            return { success: false, message: 'Failed to update purchase' };
        }
    });

    ipcMain.handle('deletePurchase', async (_, id) => {
        try {
            deletePurchase(id);
            return { success: true, message: 'Purchase deleted successfully' };
        } catch (error) {
            console.error('Error deleting purchase:', error);
            return { success: false, message: 'Failed to delete purchase' };
        }
    });

}