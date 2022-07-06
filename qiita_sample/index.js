const { PythonShell } = require('python-shell');
const{ app, BrowserWindow } = require('electron');
let mainWindow;

const openWindow = function() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
  });
  // メニュー非表示
  mainWindow.setMenuBarVisibility(false);
  // localhost:500起動
  mainWindow.loadURL('http://localhost:5000');
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