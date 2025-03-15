import { create } from 'zustand';
import {  SalesDataType } from '../types/types';

type Store = {
  salesData: SalesDataType[]; // Store purchase data array
  setSalesData: (data: SalesDataType[]) => void; // Method to update purchase data
};

const useSalesData = create<Store>((set) => ({
  salesData: [], // Initial state
  setSalesData: (data) => set(() => ({ salesData: data })), // Correctly updating the state
}));

export {
  useSalesData,
};
