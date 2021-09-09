const { app, BrowserWindow } = require("electron");
const environment = require("./envrionment");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 990,
    height: 600,
    darkTheme: true,
    title: "Chatminal",
    autoHideMenuBar: true,
    resizable: false,
    minimizable: true,
  });
  win.loadURL(environment.website);
};

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
