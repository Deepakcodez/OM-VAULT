// src/electron.d.ts
import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDetailType } from '@renderer/types/auth.types'
import { PurchaseDataType } from '@renderer/types/types'

declare global {
  interface Window {
    electron: ElectronAPI & {
      addPurchase: (purchaseData: PurchaseDataType) => Promise<void>
      addUser: (userDetail : UserDetailType) => Promise<void>
      getAllUsers: () => Promise<UserDetailType[]>
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
    }
  }
}
