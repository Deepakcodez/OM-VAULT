import { app, shell, BrowserWindow, protocol} from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { AuthHandler, ClientHandler, CompanyHandler, InstallmentHandler, PurchaseHandler, UtlityHandler } from './ipcHandlers'
import { SaleHandler } from './ipcHandlers/Sale.handler'
import path, { join } from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 670,
    show: false,
    icon : icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: true,
      preload: join(__dirname, '../preload/index.js'),
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
  protocol.registerFileProtocol('local', (request, callback) => {
    const filePath = request.url.replace('local://', '');
    const decodedPath = decodeURIComponent(filePath); // Handle %20, etc.
    callback({ path: path.normalize(decodedPath) });
  });
  AuthHandler();
  PurchaseHandler();
  SaleHandler();
  UtlityHandler(mainWindow)
  CompanyHandler();
  InstallmentHandler()
  ClientHandler()






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
