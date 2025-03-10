
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  addPurchase: (purchaseData:any) => ipcRenderer.invoke('addPurchase', purchaseData),
  addUser: (name, email) => ipcRenderer.invoke('addUser', name, email),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),
  updateUser: (id, name, email) => ipcRenderer.invoke('updateUser', id, name, email),
  deleteUser: (id) => ipcRenderer.invoke('deleteUser', id)
})
