import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  loginUser: (email: string, password: string) =>
    ipcRenderer.invoke('loginUser', { email, password }),
  addUser: (name, email) => ipcRenderer.invoke('addUser', name, email),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),

  addPurchase: (purchaseData:any) => ipcRenderer.invoke('addPurchase', purchaseData),
  getAllPurchases: () => ipcRenderer.invoke('getAllPurchases'),
  getPurchaseById: (id:string) => ipcRenderer.invoke('getPurchaseById', id),
  updatePurchase: (purchaseData:any) => ipcRenderer.invoke('updatePurchase', purchaseData),
  deletePurchase: (id:any) => ipcRenderer.invoke('deletePurchase', id),

  openDialog: (title: string, message: string, type: 'info' | 'error' | 'warning' | 'question') =>
    ipcRenderer.invoke('open-dialog', { title, message, type })
})
