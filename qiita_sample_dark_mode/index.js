const {PythonShell} = require('python-shell');
const{ app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path')
let mainWindow;

const openWindow = function() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './static/js/preload.js')
    }
  });
  // メニュー非表示
  mainWindow.setMenuBarVisibility(false);
  // localhost:500起動
  mainWindow.loadURL('http://localhost:5000');
  // ダークモード
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
};



app.whenReady().then(() => {
  PythonShell.run('./app.py');
  openWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})