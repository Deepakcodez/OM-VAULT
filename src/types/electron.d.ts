import { loginType, registerType } from "./auth.types";
import { PurchaseDataType } from "./types";

export interface ElectronAPI {
    onRegisterData: (data: registerType) => Promise<void>;
    onLoginData: (data: loginType) => Promise<void>;
    isAuthenticated: (callback: (state: boolean) => void) => void;
    removeListener: (channel: string) => void;
    onPurchaseData: (data: PurchaseDataType) => Promise<void>;
    getPurchaseData: ()=>Promise<PurchaseDataType[]>;
  }
  
  declare global {
    interface Window {
      electronAPI: ElectronAPI;
    }
  }
  
  export {};
  