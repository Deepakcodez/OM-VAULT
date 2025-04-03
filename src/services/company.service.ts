import db from './database.table'


export interface Company {
  id: string
  companyName: string
  description?: string | null
  companyLogoUrl?: string | null
  address1?: string | null
  address2?: string | null
  address3?: string | null
  address4?: string | null
  email1?: string | null
  email2?: string | null
  phone1?: string | null
  phone2?: string | null
  createdAt?: string
  updatedAt?: string
}

// Constant ID for the single company record
const SINGLE_COMPANY_ID = 'SINGLE_COMPANY_RECORD'

// Create or Update the single company
export const setCompany = (
  companyDetails: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
): { success: boolean; message: string; company?: Company } => {
  try {
    const now = new Date().toISOString()
    const existingCompany = getCompany()
 
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO company (
        id, companyName, description, companyLogoUrl,
        address1, address2, address3, address4,
        email1, email2, phone1, phone2,
        createdAt, updatedAt
      ) VALUES (
        @id, @companyName, @companyDescription, @companyLogoUrl,
        @companyAddress1, @companyAddress2, @companyAddress3, @companyAddress4,
        @companyEmail1, @companyEmail2, @companyPhone1, @companyPhone2,
        COALESCE((SELECT createdAt FROM company WHERE id = @id), @createdAt),
        @updatedAt
      )
    `)
    
    stmt.run({
      id: SINGLE_COMPANY_ID,
      ...companyDetails,
      createdAt: now,
      updatedAt: now
    })
    
    return {
      success: true,
      message: existingCompany 
        ? 'Company updated successfully' 
        : 'Company created successfully',
      company: {
        id: SINGLE_COMPANY_ID,
        ...companyDetails,
        createdAt:  now,
        updatedAt: now
      }
    }
  } catch (error) {
    console.error('Error saving company:', error)
    return {
      success: false,
      message: 'Failed to save company'
    }
  }
}

// Get the single company
export const getCompany = () => {
  try {
    return db.prepare('SELECT * FROM company WHERE id = ?').get(SINGLE_COMPANY_ID)
  } catch (error) {
    console.error('Error fetching company:', error)
    return null
  }
}