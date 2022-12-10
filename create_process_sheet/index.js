const { PythonShell } = require('python-shell');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
let mainWindow;

const openWindow = function() {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 1500, 
    height: 1000,
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできる。
      preload: path.join(__dirname, 'static', 'js', 'preload.js'),
    },
  });

  // ダイアログ作成用
  ipcMain.handle('open-dialog', async (_e, _arg) => {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile'],
      })
      .then((result) => {
        if (result.canceled) return '';
        return result.filePaths[0];
      });
  });

  // メニュー非表示
  mainWindow.setMenuBarVisibility(false);

  // localhost:500起動
  mainWindow.loadURL('http://localhost:5000');
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
  PythonShell.run('./app.py');
  openWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on('activate', () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== "darwin") {
    app.quit();
  }
});