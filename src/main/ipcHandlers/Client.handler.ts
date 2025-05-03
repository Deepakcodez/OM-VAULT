import { ipcMain } from "electron";
import { deleteClientById, getAllClients, insertClient, searchClientsByName } from "../../services/client.services";


const ClientHandler = () => {
  ipcMain.handle('insert-client', async (_, clientData) => {
    try {
      insertClient(clientData);
      return { success: true, message: ' Client inserted' }
    } catch (error) {
      console.error('Error in adding client:', error);
      return { success: false, message: 'Failed to insert Client' };
    }
  })


  ipcMain.handle('get-clients', async (_) => {
    try {
      return await getAllClients()
    } catch (error) {
      console.error('Error in getAllClients IPC handler:', error);
      return [];
    }
  });

  ipcMain.handle('search-clients-by-name', async (_, searchTerm: string) => {
    try {
      console.log('searchTerm:', searchTerm);
      return await searchClientsByName(searchTerm )
    } catch (error) {
      console.error('Error in getAllClients IPC handler:', error);
      return [];
    }
  });

  ipcMain.handle('delete-client', async (_, id: string) => {
    try {
      console.log('client id:', id);
      return await deleteClientById(id )
    } catch (error) {
      console.error('Error in deleting client :', error);
      return [];
    }
  });



}

export { ClientHandler }
