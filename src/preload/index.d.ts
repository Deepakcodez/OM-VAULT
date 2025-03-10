// src/electron.d.ts
import { ElectronAPI } from '@electron-toolkit/preload'
import { PurchaseDataType } from '@renderer/types/types'

declare global {
  interface Window {
    electron: ElectronAPI & {
      addPurchase: (purchaseData: PurchaseDataType) => Promise<void>
      insertUser: (name: string, email: string) => Promise<void>
      getAllUsers: () => Promise<
        Array<{ id: number; name: string; email: string; created_at: string }>
      >
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
    }
  }
}
