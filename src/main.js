const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { shell } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 740,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
    frame: false,
    maximizable: false,
    transparent: true,
    resizable: false,
    icon: "/resources/logo.ico",
  });
  ipcMain.handle("m-win", async (event, args) => {
    win.minimize();
  });
  ipcMain.handle("m-exit", async (event, args) => {
    win.close();
  });
  win.loadFile("./src/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
