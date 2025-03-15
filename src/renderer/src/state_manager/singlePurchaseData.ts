import { create } from 'zustand';
import { PurchaseDataType } from '../types/types';

type Store = {
  singlePurchaseData: PurchaseDataType | null;
  setSinglePurchaseData: (data: PurchaseDataType | null) => void; // Method to update purchase data
};

const useSinglePurchaseStore = create<Store>((set) => ({
  singlePurchaseData:null , // Initial state
  setSinglePurchaseData: (data) => set(() => ({ singlePurchaseData: data })), // Correctly updating the state
}));

export {
  useSinglePurchaseStore,
};
