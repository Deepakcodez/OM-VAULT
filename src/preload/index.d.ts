import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDetailType } from '@renderer/types/auth.types'
import { InstallmentType, PurchaseDataType } from '@renderer/types/types'

declare global {
  interface Window {
    electron: ElectronAPI & {
      addPurchase: (purchaseData: PurchaseDataType) => Promise<void>
      addSales: (salesData: PurchaseDataType) => Promise<void>
      addUser: (userDetail: UserDetailType) => Promise<void>
      loginUser: (
        email: string,
        password: string
      ) => Promise<{
        success: boolean
        message: string
        isAuthenticated: boolean
        user?: UserDetailType
      }>
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>

      getAllPurchases: () => Promise<PurchaseDataType[]>
      getPurchaseByPaymentMethod: (paymentMethod : string)=> Promise<any>
      addInstallment:(installmentId: string, newInstallment: InstallmentType)=> Promise<void>
      getAllSales: () => Promise<PurchaseDataType[]>


      openDialog: (
        title: string,
        message: string,
        type?: 'info' | 'error' | 'warning' | 'question'
      ) => Promise<Electron.OpenDialogReturnValue>
    }
  }
}
