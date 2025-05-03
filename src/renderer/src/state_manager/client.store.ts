import { create } from 'zustand';

type ClientStore = {
  singleClientData: ClientTypes | null;
  setSingleClientData: (data: ClientTypes | null) => void; // Method to update purchase data
};

const useSingleClientStore = create<ClientStore>((set) => ({
  singleClientData:null , // Initial state
  setSingleClientData: (data) => set(() => ({ singleClientData: data })), // Correctly updating the state
}));

export {
  useSingleClientStore,
};
