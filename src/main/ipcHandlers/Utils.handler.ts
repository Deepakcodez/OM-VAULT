import { BrowserWindow, dialog, ipcMain } from "electron"
import fs from 'fs'

export const UtlityHandler = (mainWindow: BrowserWindow | null) => {

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


    ipcMain.handle('generate-styled-pdf', async (_, htmlContent) => {
        const win = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            }
        });

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

        await new Promise(resolve => setTimeout(resolve, 500));

        const pdfOptions: Electron.PrintToPDFOptions = {
            printBackground: true,
            landscape: false,
            pageSize: 'A4',
            margins: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
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

}