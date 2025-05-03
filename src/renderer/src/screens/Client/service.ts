import { ClientSchemaType } from "@renderer/types/Schemas";

const addClient = async (clienData:ClientSchemaType) => {
  const response = await window.electron.addClient(clienData)
  return response;
}
const getClient = async () => {
  try {
    const response = await window.electron.getClients()
    return response;
  } catch (error) {
   return []
  }
}


export {
  addClient,
  getClient
}
