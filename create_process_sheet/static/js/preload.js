const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  openDialog: async () => ipcRenderer.invoke('open-dialog'),
});


window.addEventListener("DOMContentLoaded", () => {
  // DOM要素のテキストを変更
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.textContent = text;
    }
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    // HTMLページ内の文言を差し替え
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});