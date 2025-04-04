import { create } from 'zustand';
import {  SalesDataType } from '../types/types';

type Store = {
  singleSalesData: SalesDataType | null;
  setSingleSalesData: (data: SalesDataType | null) => void;
};

const useSingleSalesStore = create<Store>((set) => ({
  singleSalesData:null , 
  setSingleSalesData: (data) => set(() => ({ singleSalesData: data })),
}));

export {
  useSingleSalesStore,
};
