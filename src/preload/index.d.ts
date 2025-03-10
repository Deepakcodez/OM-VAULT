// src/electron.d.ts
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      insertUser: (name: string, email: string) => Promise<void>
      getAllUsers: () => Promise<
        Array<{ id: number; name: string; email: string; created_at: string }>
      >
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
    }
  }
}
