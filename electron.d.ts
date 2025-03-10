declare global {
  interface Window {
    electronAPI: {
      getAllUsers: () => Promise<
        Array<{ id: number; name: string; email: string; created_at: string }>
      >
      insertUser: (name: string, email: string) => Promise<void>
      updateUser: (id: number, name: string, email: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
    }
  }
}
