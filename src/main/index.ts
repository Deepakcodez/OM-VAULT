import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {
  insertUser,
  getAllUsers,
  getUserByEmail
} from '../services/user.services'
import bcrypt from 'bcryptjs'
import icon from '../../resources/icon.png?asset'
import { addInstallment, deletePurchase, getAllPurchases, getFilterPurchases, getPurchaseById, getPurchaseByPaymentMethod, insertPurchase, updatePurchase } from '../services/purchase.services'
import { getAllSales, insertSales } from '../services/sales.services'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow){
      mainWindow.show()
      mainWindow.setMenu(null)
    }
  })

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
      const response =  insertSales(purchaseData);
      console.log(response,"responses sales")
      return { success: true, message: 'Sales added successfully' };
    } catch (error) {
      console.error('Error adding purchase:', error);
      return { success: false, message: 'Failed to add purchase' };
    }
  });

  ipcMain.handle('getAllPurchases', async () => {
    return getAllPurchases();
  });
  ipcMain.handle('getFilterPurchases', async (_,searchQuery) => {
    console.log(searchQuery,"searchQuery")
    return getFilterPurchases(searchQuery);
  });
  ipcMain.handle('getAllSales', async () => {
    return getAllSales();
  });

  ipcMain.handle('getPurchaseById', async (_, id) => {
    return getPurchaseById(id);
  });

  ipcMain.handle("getPurchaseByPaymentMethod", async(__, paymentMethod) =>{
    return getPurchaseByPaymentMethod(paymentMethod);
  })

  ipcMain.handle('addInstallments', async (_, purchaseId, newInstallment) => {
    try {
      const addedInstllment =  addInstallment(purchaseId, newInstallment);
      console.log(addedInstllment,"addedInstllment");

      return ;
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
