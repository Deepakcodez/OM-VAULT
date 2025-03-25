import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {

  // ---------------------Auth preloads----------------------
  loginUser: (email: string, password: string) =>
    ipcRenderer.invoke('loginUser', { email, password }),

  //-----------------get preloads---------------------
    //uses preloads
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),

  //purchase preloada
  getAllPurchases: (year:string) => ipcRenderer.invoke('getAllPurchases', year),
  getFilterPurchases: (searchQuery:string, year:string) => ipcRenderer.invoke('getFilterPurchases', searchQuery, year),
  getPurchaseById: (id: string) => ipcRenderer.invoke('getPurchaseById', id),
  getPurchaseByPaymentMethod: (paymentMethod: string, year:string) =>
    ipcRenderer.invoke('getPurchaseByPaymentMethod', paymentMethod,year),


  //sales preloads
  getAllSales: (year:string) => ipcRenderer.invoke('getAllSales',year),
  getFilterSale: (searchQuery:string, year:string) => ipcRenderer.invoke('getFilterSale', searchQuery,year),
  getSalesByPaymentMethod: (paymentMethod: string, year:string) =>
    ipcRenderer.invoke('getSalesByPaymentMethod', paymentMethod, year),

  // --------------------------create preloads---------------------------
  addUser: (name, email) => ipcRenderer.invoke('addUser', name, email),
  addPurchase: (purchaseData: any) => ipcRenderer.invoke('addPurchase', purchaseData),
  addSales: (purchaseData: any) => ipcRenderer.invoke('addSales', purchaseData),

  // -----------------------installment preloads-------------------------------------
  addInstallment: (installmentId: string, newInstallment: string, type :string) =>
    ipcRenderer.invoke('addInstallments', installmentId, newInstallment, type),
  
  // update preloads
  updatePurchase: (purchaseData: any) => ipcRenderer.invoke('updatePurchase', purchaseData),
  deletePurchase: (id: any) => ipcRenderer.invoke('deletePurchase', id),
  
// other utils preloads
  openDialog: (title: string, message: string, type: 'info' | 'error' | 'warning' | 'question') =>
    ipcRenderer.invoke('open-dialog', { title, message, type })
})
