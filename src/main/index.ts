import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import path, { join } from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {
  insertUser,
  getAllUsers,
  getUserByEmail
} from '../services/user.services'
import bcrypt from 'bcryptjs'
import icon from '../../resources/icon.png?asset'
import { addInstallment, deletePurchase, getAllPurchases, getAllPurchasesByYear, getFilterPurchases, getPurchaseById, getPurchaseByPaymentMethod, getPurchaseByPaymentMethodAndYear, insertPurchase, updatePurchase } from '../services/purchase.services'
import { addInstallmentSales, getAllSaleByYear, getAllSales, getFiltersale, getSalesByPaymentMethod, getSalesByPaymentMethodAndYear, insertSales } from '../services/sales.services'
import {  getCompany, setCompany } from '../services/company.service'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, '../preload/index.js'),
      devTools: true,
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.setMenu(null)
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.webContents.openDevTools()
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('addUser', async (_, userData) => {
    console.log('from main process user data', userData)

    try {
      // Hash the password with salt rounds (10 is a good default)
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      // Replace plain password with hashed one
      const userWithHashedPassword = { ...userData, password: hashedPassword }

      // Insert user into the database
      insertUser(userWithHashedPassword)

      return { success: true, message: 'User added successfully' }
    } catch (error) {
      console.error('Error hashing password:', error)
      return { success: false, message: 'Failed to add user' }
    }
  })

  ipcMain.handle('loginUser', async (_, { email, password }) => {
    try {
      // Fetch user from the database based on email
      const user = getUserByEmail(email)

      if (!user) {
        return { success: false, message: 'User not found', isAuthenticated: false }
      }

      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return { success: false, message: 'Invalid email or password', isAuthenticated: false }
      }

      return { success: true, message: 'Login successful', isAuthenticated: true, user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Something went wrong', isAuthenticated: false }
    }
  })

  ipcMain.handle('getAllUsers', () => {
    console.log('from main process get all users')
    return getAllUsers()
  })

  ipcMain.handle('open-dialog', async (_, { title, message, type }) => {
    console.log('from main process open dialog', title, message, type)
    const response = await dialog.showMessageBox(mainWindow!, {
      type: type,
      buttons: ['OK'],
      defaultId: 0,
      title: title,
      message: message
    })
    return response.response // Returns index of clicked button
  })

  ipcMain.handle('addPurchase', async (_, purchaseData) => {
    console.log('from main process purchase data', purchaseData)
    try {
      insertPurchase(purchaseData);
      return { success: true, message: 'Purchase added successfully' };
    } catch (error) {
      console.error('Error adding purchase:', error);
      return { success: false, message: 'Failed to add purchase' };
    }
  });


  ipcMain.handle('addSales', async (_, purchaseData) => {
    console.log('from main process sales data', purchaseData)
    try {
      const response = insertSales(purchaseData);
      console.log(response, "responses sales")
      return { success: true, message: 'Sales added successfully' };
    } catch (error) {
      console.error('Error adding purchase:', error);
      return { success: false, message: 'Failed to add purchase' };
    }
  });

  ipcMain.handle('getAllPurchases', async (_, year) => {

    try {
      // Trim and normalize the year parameter
      const normalizedYear = String(year).trim();

      // Check if year is 'all' (case-insensitive)
      if (+year === 0) {
        return await getAllPurchases(); // Ensure this function is awaited
      }
      return getAllPurchasesByYear(normalizedYear); // Ensure this function is awaited
    } catch (error) {
      console.error('Error in getAllPurchases IPC handler:', error);
      return [];
    }
  });


  ipcMain.handle('getFilterPurchases', async (_, searchQuery, year?: string) => {
    console.log(searchQuery, year, "searchQuery main")
    return getFilterPurchases(searchQuery, year);
  });

  ipcMain.handle('getFilterSale', async (_, searchQuery, year?: string) => {
    return getFiltersale(searchQuery, year);
  })

  ipcMain.handle('getAllSales', async (_, year) => {
    try {
      // Trim and normalize the year parameter
      const normalizedYear = String(year).trim();

      // Check if year is 'all' (case-insensitive)
      if (+year === 0) {
        return await getAllSales(); // Ensure this function is awaited
      }
      return getAllSaleByYear(normalizedYear); // Ensure this function is awaited
    } catch (error) {
      console.error('Error in getAllPurchases IPC handler:', error);
      return [];
    }
  });

  ipcMain.handle('getPurchaseById', async (_, id) => {
    return getPurchaseById(id);
  });

  ipcMain.handle("getPurchaseByPaymentMethod", async (__, paymentMethod, year) => {
    const normalizedYear = String(year).trim();
    if (+year !== 0) {
      return getPurchaseByPaymentMethodAndYear(paymentMethod, normalizedYear);
    }
    // If year is 'all', return all purchases without filtering by year
    return getPurchaseByPaymentMethod(paymentMethod);
  })

  ipcMain.handle("getSalesByPaymentMethod", async (__, paymentMethod, year) => {
    const normalizedYear = String(year).trim();
    if (+year !== 0) {
      return getSalesByPaymentMethodAndYear(paymentMethod, normalizedYear);
    }

    return getSalesByPaymentMethod(paymentMethod);

  })

  ipcMain.handle('addInstallments', async (_, purchaseId, newInstallment, type) => {
    try {
      if (type === "purchases") {
        const addedInstllment = addInstallment(purchaseId, newInstallment);
        console.log(addedInstllment)
      } else {
        const addedInstllment = addInstallmentSales(purchaseId, newInstallment);
        console.log(addedInstllment)
      }
      return
    } catch (error) {
      console.error('Error updating purchase:', error);
      return { success: false, message: 'Failed to update purchase' };
    }
  });

  ipcMain.handle('updatePurchase', async (_, purchaseData) => {
    try {
      updatePurchase(purchaseData);
      return { success: true, message: 'Purchase updated successfully' };
    } catch (error) {
      console.error('Error updating purchase:', error);
      return { success: false, message: 'Failed to update purchase' };
    }
  });

  ipcMain.handle('deletePurchase', async (_, id) => {
    try {
      deletePurchase(id);
      return { success: true, message: 'Purchase deleted successfully' };
    } catch (error) {
      console.error('Error deleting purchase:', error);
      return { success: false, message: 'Failed to delete purchase' };
    }
  });

 
  ipcMain.handle('generate-styled-pdf', async (_, htmlContent) => {
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    // Load HTML with proper base URL for relative paths
    await win.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <base href="file://${__dirname}/">
        <style>
          @page { margin: 0; }
          body { margin: 0; -webkit-print-color-adjust: exact !important; }
        </style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `)}`);

    // Wait for resources to load
    await new Promise(resolve => setTimeout(resolve, 500));

    const pdfOptions = {
      printBackground: true,
      landscape: false,
      pageSize: "A4",
      marginsType: 0,
      preferCSSPageSize: true
    };

    const pdfData = await win.webContents.printToPDF(pdfOptions);
    win.close();
    return pdfData;
  });

  ipcMain.handle('save-pdf-dialog', async (_, defaultFilename) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Save Invoice as PDF',
      defaultPath: defaultFilename,
      filters: [
        { name: 'PDF Files', extensions: ['pdf'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    return filePath;
  });

  ipcMain.handle('save-pdf-file', async (_, { pdfData, filePath }) => {
    try {
      fs.writeFileSync(filePath, pdfData);
      return { success: true };
    } catch (error) {
      console.error('Error saving PDF:', error);
      return { success: false, error: error };
    }
  });

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
  });



  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
