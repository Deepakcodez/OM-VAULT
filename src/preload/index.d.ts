import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDetailType } from '@renderer/types/auth.types'
import { InstallmentType, PurchaseDataType, SalesDataType } from '@renderer/types/types'

declare global {
  interface Window {
    electron: ElectronAPI & {
      addPurchase: (purchaseData: any) => Promise<void>
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

      getAllPurchases: (year:string) => Promise<PurchaseDataType[]>
      getPurchaseByPaymentMethod: (paymentMethod : string)=> Promise<any>
      getSalesByPaymentMethod: (paymentMethod : string)=> Promise<any>
      addInstallment:(installmentId: string, newInstallment: InstallmentType,type : string)=> Promise<void>
      getAllSales: () => Promise<PurchaseDataType[]>
      getFilterPurchases: (searchQuery: string, year:string) => Promise<PurchaseDataType[]>
      getFilterSale: (searchQuery: string) => Promise<SalesDataType[]>


      openDialog: (
        title: string,
        message: string,
        type?: 'info' | 'error' | 'warning' | 'question'
      ) => Promise<Electron.OpenDialogReturnValue>
    }
  }
}
