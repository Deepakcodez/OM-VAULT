import path from "node:path";
import fs from "fs";
import { exec } from "node:child_process";
import { app, } from "electron";

// const getHiddenFolderPath = () => {
//   return process.platform === "win32"
//     ? path.join(app.getPath("userData"), "HiddenPurchases") // Windows hidden folder
//     : path.join(app.getPath("userData"), ".HiddenPurchases"); // macOS/Linux hidden folder
// };

const ensureFolderExists = (folderPath:string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });

    // Make folder hidden on Windows
    if (process.platform === "win32") {
      exec(`attrib +H "${folderPath}"`);
    }
  }
};

// const getFilePath = (purchaserName :string) => {
//   const hiddenFolderPath = getHiddenFolderPath();
//   const purchaserFolderPath = path.join(hiddenFolderPath, purchaserName);
//   ensureFolderExists(purchaserFolderPath); // Ensure purchaser's folder exists

//   return path.join(purchaserFolderPath, "purchaseData.json");
// };

// const writeHiddenFile = (purchaserName, data) => {
//   if (!purchaserName) {
//     throw new Error("Purchaser name is required!");
//   }

//   const filePath = getFilePath(purchaserName);

//   let existingData = [];
//   if (fs.existsSync(filePath)) {
//     existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   }

//   const newData = [...existingData, data];

//   fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
//   return { success: true, message: "Data saved successfully!", filePath };
// };

// const readHiddenFile = (purchaserName) => {
//   if (!purchaserName) {
//     throw new Error("Purchaser name is required!");
//   }

//   const filePath = getFilePath(purchaserName);

//   if (!fs.existsSync(filePath)) {
//     return { success: false, message: "No purchase data found." };
//   }

//   const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   return { success: true, data: fileData };
// };

const createHiddenFolder = (folderName:string, fileName : string ) => {
  let hiddenFolderPath;
  if(process.platform === 'win32') {
      hiddenFolderPath = path.join(app.getPath("userData"), folderName);
    }else{
      hiddenFolderPath = path.join(app.getPath("home"), `.${folderName}`);
    }

    ensureFolderExists(hiddenFolderPath);
    return  path.join(hiddenFolderPath,  `${fileName}.json`);
}
const readDataFromFile = (filePath: string) => {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    // If the file doesn't exist or there's an error, return an empty array
    return [];
  }
};

const writeFile = (existingData:string,newData:any, filePath:string) => {
    const latestData = [...existingData,newData ];

  fs.writeFileSync(filePath,JSON.stringify(latestData, null, 2), "utf-8")
  return { success: true, message: "Data saved successfully!", filePath };
}
export {  createHiddenFolder, readDataFromFile, writeFile };
