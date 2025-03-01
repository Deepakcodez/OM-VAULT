import { create } from 'zustand';
import { PurchaseDataType } from '../types/types';

type Store = {
  purchaseData: PurchaseDataType[]; // Store purchase data array
  setPurchaseData: (data: PurchaseDataType[]) => void; // Method to update purchase data
};

const usePurchaseStore = create<Store>((set) => ({
  purchaseData: [], // Initial state
  setPurchaseData: (data) => set(() => ({ purchaseData: data })), // Correctly updating the state
}));

export {
  usePurchaseStore,
};
