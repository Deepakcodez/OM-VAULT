import { ipcMain } from "electron";
import { addInstallment } from "../../services/purchase.services";
import { addInstallmentSales } from "../../services/sales.services";

export const InstallmentHandler = () => {
    ipcMain.handle('addInstallments', async (_, purchaseId, newInstallment, type) => {
        try {
          if (type === "purchases") {
            const addedInstllment = addInstallment(purchaseId, newInstallment);
            console.log(addedInstllment)
          } else {
            const addedInstllment = addInstallmentSales(purchaseId, newInstallment);
            console.log(addedInstllment)
          }
          return
        } catch (error) {
          console.error('Error updating purchase:', error);
          return { success: false, message: 'Failed to update purchase' };
        }
      });
}


