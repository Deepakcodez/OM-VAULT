import { loginType, registerType } from "./auth.types";
import { PurchaseDataType } from "./types";

export interface ElectronAPI {
  addPurchase: (purchaseData: string) => Promise<void>
    onRegisterData: (data: registerType) => Promise<void>;
    insertUser: (data: {name:string, email:string}) => Promise<void>;
    onLoginData: (data: loginType) => Promise<void>;
    isAuthenticated: (callback: (state: boolean) => void) => void;
    removeListener: (channel: string) => void;
    onPurchaseData: (data: PurchaseDataType) => Promise<void>;
    getPurchaseData: ()=>Promise<PurchaseDataType[]>;
    showCustomAlert: (message: string) => void;
  }

  declare global {
    interface Window {
      electronAPI: ElectronAPI;
      ipcRenderer: import('electron').IpcRenderer;
    }
  }

  export {};
