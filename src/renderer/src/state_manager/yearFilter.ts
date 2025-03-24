import { create } from 'zustand'

type YearFilterState = {
  year: number | string | null
  setYear: (year: number | string | null) => void
}

const useYearFilterStore = create<YearFilterState>((set) => ({
  year: new Date().getFullYear(),
  setYear: (year) => set({ year })
}))

export default useYearFilterStore;
