// preload.js
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  insertUser: (name, email) => ipcRenderer.invoke('insertUser', name, email),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),
  updateUser: (id, name, email) => ipcRenderer.invoke('updateUser', id, name, email),
  deleteUser: (id) => ipcRenderer.invoke('deleteUser', id)
})
