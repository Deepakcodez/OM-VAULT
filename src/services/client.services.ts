import db from './database.table'
import { randomUUID } from 'crypto'

export interface ClientType {
  id?: string
  name: string
  email: string
  phone: string
  gst: string
  hsn: string
  address: string
}


// Insert Purchase
export const insertClient = (clientData: Omit<ClientType, 'id'>) => {

  const clientWithId: ClientType = {
    id: randomUUID().toString(),
    ...clientData,
  }
  const stmt = db.prepare(`
    INSERT INTO client (
      id, name, email, phone , gst, hsn, address
    ) VALUES (
      @id, @name, @email, @phone, @gst, @hsn, @address)
  `)
  return stmt.run(clientWithId)

}


export const getAllClients = () => {
  try {
    return   db.prepare('SELECT * FROM client').all()

  } catch (error) {
    return error
  }
}


// Get Clients by Name (partial match)
export const searchClientsByName = (searchTerm: string) => {
  try {
    return db.prepare('SELECT * FROM client WHERE name LIKE ?')
      .all(`%${searchTerm}%`)
  } catch (error) {
    console.error('Error searching clients:', error)
    return []
  }
}

// Delete Client by ID
export const deleteClientById = (id: string) => {
  try {
    const stmt = db.prepare('DELETE FROM client WHERE id = ?')
    const result = stmt.run(id)
    return { success: result.changes > 0, changes: result.changes }
  } catch (error) {
    console.error('Error deleting client:', error)
    return { success: false, error }
  }
}
