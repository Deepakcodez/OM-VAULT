import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  loginUser: (email: string, password: string) =>
    ipcRenderer.invoke('loginUser', { email, password }),
  addUser: (name, email) => ipcRenderer.invoke('addUser', name, email),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),

  addPurchase: (purchaseData: any) => ipcRenderer.invoke('addPurchase', purchaseData),
  addSales: (purchaseData: any) => ipcRenderer.invoke('addSales', purchaseData),
  getAllPurchases: () => ipcRenderer.invoke('getAllPurchases'),
  getAllSales: () => ipcRenderer.invoke('getAllSales'),
  getFilterPurchases: (searchQuery:string, year:string) => ipcRenderer.invoke('getFilterPurchases', searchQuery, year),
  getFilterSale: (searchQuery:string) => ipcRenderer.invoke('getFilterSale', searchQuery),
  getPurchaseById: (id: string) => ipcRenderer.invoke('getPurchaseById', id),
  updatePurchase: (purchaseData: any) => ipcRenderer.invoke('updatePurchase', purchaseData),
  deletePurchase: (id: any) => ipcRenderer.invoke('deletePurchase', id),


  getPurchaseByPaymentMethod: (paymentMethod: string) =>
    ipcRenderer.invoke('getPurchaseByPaymentMethod', paymentMethod),



  getSalesByPaymentMethod: (paymentMethod: string) =>
    ipcRenderer.invoke('getSalesByPaymentMethod', paymentMethod),



  addInstallment: (installmentId: string, newInstallment: string, type :string) =>
    ipcRenderer.invoke('addInstallments', installmentId, newInstallment, type),

  openDialog: (title: string, message: string, type: 'info' | 'error' | 'warning' | 'question') =>
    ipcRenderer.invoke('open-dialog', { title, message, type })
})
