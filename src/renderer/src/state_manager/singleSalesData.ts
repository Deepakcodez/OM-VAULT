import { create } from 'zustand';
import {  SalesDataType } from '../types/types';

type Store = {
  singleSalesData: SalesDataType | null;
  setSingleSalesData: (data: SalesDataType | null) => void;
};

const useSingleSalesStore = create<Store>((set) => ({
  singleSalesData:null , // Initial state
  setSingleSalesData: (data) => set(() => ({ singleSalesData: data })), // Correctly updating the state
}));

export {
  useSingleSalesStore,
};
