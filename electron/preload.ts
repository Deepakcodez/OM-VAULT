import { ipcRenderer, contextBridge } from "electron";
import { loginType, registerType } from "../src/types/auth.types";
import { PurchaseDataType } from "../src/types/types";

contextBridge.exposeInMainWorld("electronAPI", {
 onRegisterData: (data: registerType) => ipcRenderer.invoke("register-data", data),
 onLoginData: (data: loginType) => ipcRenderer.invoke("login-data", data),
 isAuthenticated : (cb:(state:boolean)=>void)=> ipcRenderer.once("isAuthenticated", (_, state)=>cb(state)),
 removeListener: (channel: string) => ipcRenderer.removeAllListeners(channel),
 onPurchaseData: (data: PurchaseDataType) => ipcRenderer.invoke("purchase-data", data),
 getPurchaseData: () => ipcRenderer.invoke("get-purchase-data"),
});
