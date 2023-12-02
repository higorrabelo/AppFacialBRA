const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const db = require('./config/db');
const User = require('./models/users')

db.authenticate().then(()=>{
  console.log("Conectado ao banco")
}).catch((err)=>{
  console.error(err)
})

  const options = {
    type: 'error',
    title: "Operação Concluída",
    message: "Operação realizada com sucesso",
    buttons: ['OK']
  };


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle("minimize",()=>{
    mainWindow.minimize();
  })
  ipcMain.handle("maximize",()=>{
    mainWindow.maximize();
  })
  ipcMain.handle("quit",()=>{
    mainWindow.close();
  })
  ipcMain.handle("save",(err,data)=>{
    save(data)
    options.type = 'info'
    dialog.showMessageBox(null,options,()=>{
      console.log("Salvo com sucesso!!!")
    }) 
  })
  ipcMain.handle("message",()=>{
    dialog.showMessageBox(null,options,()=>{
      console.log("Chegou até aqui")
    })
  })
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
async function save(user){
 await User.create(user)
}