import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'
import {
  // createHiddenFolder,
  // readDataFromFile,
  // writeFile
} from './utility-func/File-utils'

// const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
global.__filename = __filename;
global.__dirname = __dirname;

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null
// ✅ Initialize Database Globally (Before Window is Created)

const dbPath = path.join(app.getPath('userData'), 'purchaseData.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// ✅ Create Table if Not Exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT,
    price REAL,
    quantity INTEGER,
    paymentStatus TEXT
  )
`).run();
function createWindow () {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo_icon.png'),
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      // nodeIntegration:true,
      // contextIsolation: false,
      preload: path.join(__dirname, 'preload.mjs')
    }
  })
   
  
  // win.setMenu(null);
  const webContents = win.webContents
  webContents.openDevTools()
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}
 
// ipcMain.handle("register-data", async (_, data) => {
//   const salt = await bcrypt.genSalt(9);
//   const hashpassword = await bcrypt.hash(data.password, salt);
//   const registerData = {
//     name: data.name,
//     email: data.email,
//     password: hashpassword,
//     phone: data.phone,
//   };
//   const filePath = path.join(app.getPath("userData"), "userData.json");
//   console.log(filePath);
//   if (filePath) {
//     try {
//       fs.writeFileSync(
//         filePath,
//         JSON.stringify(registerData, null, 2),
//         "utf-8"
//       );
//       return {
//         success: true,
//         message: "Data saved successfully!",
//         path: filePath,
//       };
//     } catch (error) {
//       return { success: false, message: "Error saving data", error };
//     }
//   } else {
//     return { success: false, message: "File save canceled" };
//   }
// }); 

const readDataFromFile = (filePath: string) => {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    // If the file doesn't exist or there's an error, return an empty array
    return [];
  }
};

// ipcMain.handle('show-custom-alert', async (_, message) => {
  
//   await dialog.showMessageBox(win!, {
//     type: 'error',
//     buttons: ['OK'],
//     title: 'Alert',
//     message: message,
//     detail: 'Please fill all the fields correctly and try again.',
//   });
// });

ipcMain.handle("get-purchase-data", async () => {
  const filePath = path.join(app.getPath("userData"), "purchaseData.json");

  console.log(filePath);
  if (filePath) {
    try {
      const purchaseData = readDataFromFile(filePath);
      
      return purchaseData
    } catch (error) {
      return [];
    }
  } else {
    return { success: false, message: "File save canceled" };
  }
});


ipcMain.handle('register-data', async (_, data) => {
  const salt = await bcrypt.genSalt(9)
  const hashpassword = await bcrypt.hash(data.password, salt)
  const registerData = {
    name: data.name,
    email: data.email,
    password: hashpassword,
    phone: data.phone
  }
  const filePath = path.join(app.getPath('userData'), 'userData.json')
  console.log(filePath)
  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(registerData, null, 2), 'utf-8')
      return {
        success: true,
        message: 'Data saved successfully!',
        path: filePath
      }
    } catch (error) {
      return { success: false, message: 'Error saving data', error }
    }
  } else {
    return { success: false, message: 'File save canceled' }
  }
})

ipcMain.handle('show-custom-alert', async (_, message) => {
  await dialog.showMessageBox(win!, {
    type: 'error',
    buttons: ['OK'],
    title: 'Alert',
    message: message,
    detail: 'Please fill all the fields correctly and try again.'
  })
})

// ipcMain.handle('get-purchase-data', async () => {
//   const filePath = path.join(app.getPath('userData'), 'purchaseData.json')

//   console.log(filePath)
//   if (filePath) {
//     try {
//       const purchaseData = readDataFromFile(filePath)

//       return purchaseData
//     } catch (error) {
//       return []
//     }
//   } else {
//     return { success: false, message: 'File save canceled' }
//   }
// })

// ipcMain.handle('purchase-data', async (_, data) => {
//   const purchaseDataPath = createHiddenFolder('Purchase', 'purchaseData')
//   try {
//     let existingPurchaseData = []
//     if (fs.existsSync(purchaseDataPath))   existingPurchaseData = readDataFromFile(purchaseDataPath)
//     writeFile(existingPurchaseData, data, purchaseDataPath)
//   } catch (error) {
//     console.log(error)
//     return { success: false, message: 'Error saving data', error }
//   }
// })

// Save Purchase Data
ipcMain.handle('purchase-data', (_, data) => {
  if (!db) {
    return { success: false, message: 'Database not initialized!' }
  }
  
  const stmt = db.prepare(
    `INSERT INTO purchases (productName, price, quantity, paymentStatus) 
     VALUES (@productName, @price, @quantity, @paymentStatus)`
  )
  stmt.run(data)
  return { success: true, message: 'Purchase saved!' }
})


ipcMain.handle('login-data', async (_, data) => {
  console.log(data)
  const filePath = path.join(app.getPath('userData'), 'userData.json')
  if (filePath) {
    try {
      const storedData = fs.readFileSync(filePath, 'utf-8')
      const userEmail = data.email
      const userPassword = data.password
      const { email, password } = JSON.parse(storedData)
      const ispasswordmatch = await bcrypt.compare(userPassword, password)
      if (ispasswordmatch && userEmail == email) {
        return win?.webContents.send('isAuthenticated', true)
      } else {
        return win?.webContents.send('isAuthenticated', false)
      }
    } catch (error) {
      return { success: false, message: 'Error saving data', error }
    }
  } else {
    return { success: false, message: 'File save canceled' }
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close()
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
