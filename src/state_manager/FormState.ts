import { create } from 'zustand'

type Store = {
  showForm: boolean
  setShowForm: () => void
} 

const useFormStore = create<Store>()((set) => ({
  showForm: false,
  setShowForm: () => set((state) =>({showForm : !state.showForm})),
}))


export {
    useFormStore
}