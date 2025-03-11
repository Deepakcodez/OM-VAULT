import { create } from 'zustand'

type Store = {
  activeSection: 'sale' | 'purchase'
  setActiveSection: (data: 'sale' | 'purchase') => void
}

const useInstallmentStore = create<Store>((set) => ({
  activeSection: 'purchase', // Initial state
  setActiveSection: (state) => set(() => ({ activeSection: state }))
}))

export { useInstallmentStore }
