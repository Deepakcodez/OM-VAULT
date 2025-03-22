import { create } from 'zustand'

type YearFilterState = {
  year: number
  setYear: (year: number) => void
}

const useYearFilterStore = create<YearFilterState>((set) => ({
  year: new Date().getFullYear(),
  setYear: (year) => set({ year })
}))

export default useYearFilterStore;
