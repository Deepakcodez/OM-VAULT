import { app, ipcMain } from "electron"
import { getCompany, setCompany } from "../../services/company.service"
import path from 'path'
import fs from 'fs'
export const CompanyHandler = ()=>{

  // Save company logo handler
  ipcMain.handle('setCompanyLogo', async (_, arrayBuffer: ArrayBuffer, filename: string) => {

    const buffer = Buffer.from(arrayBuffer)

    const logoDir = path.join(app.getPath('userData'), 'company_logos')
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true })
    }

    const logoPath = path.join(logoDir, filename)
    fs.writeFileSync(logoPath, buffer)
    return logoPath
  })

  ipcMain.handle('getCompany', async () => {
    try {
      return getCompany();
    } catch (error) {
      console.error('Error getting company:', error);
      return { success: false, message: 'Failed to fetch company' };
    }
  })


  ipcMain.handle('setCompany', async (_, companyData) => {
    console.log(companyData, "company data")
    try {
      setCompany(companyData)
      return { success: true, message: 'Company added successfully' };
    } catch (error) {
      console.error('Error adding company:', error);
      return { success: false, message: 'Failed to add company' };
    }
  })

}