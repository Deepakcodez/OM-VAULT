// src/electron.d.ts
import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDetailType } from '@renderer/types/auth.types'
import { PurchaseDataType } from '@renderer/types/types'

declare global {
  interface Window {
    electron: ElectronAPI & {
      addPurchase: (purchaseData: PurchaseDataType) => Promise<void>
      addUser: (userDetail : UserDetailType) => Promise<void>
      getAllUsers: () => Promise<
        Array<{ id: number; name: string; email: string; created_at: string }>
      >
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
    }
  }
}
