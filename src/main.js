const { app, shell, BrowserWindow, Menu, Tray } = require("electron");
const { website } = require("./envrionment");
const { checkForUpdate } = require("./update");
const { getIcon } = require("./icon");
const { showDialog } = require("./dialog");

/** Start setting up the app. */
setupApp();

/** Support system tray? */
const allowTray = process.platform !== "linux";

/** System tray instance. */
let tray = null;

/** Main window instance. */
let window = null;

/** Create the system tray of the app. */
function createTray() {
  /** Create tray if it should support. */
  if (!allowTray) {
    return false;
  }
  /** Create the system tray instance. */
  tray = new Tray(getIcon().ico);
  /** Set tooltip to app title. */
  tray.setToolTip("Chatminal");
  /** Set menu items for the system tray. */
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Chatminal", type: "normal", enabled: false },
    { type: "separator" },
    /** Show the app window on click. */
    { label: "Open", type: "normal", click: () => window.show() },
    /** Show the app window new room page on click. */
    {
      label: "New Room", type: "normal", click: () => {
        window.show();
        window.loadURL(`${website}new/`);
      },
    },
    /** Show the app window settings page on click. */
    {
      label: "Settings", type: "normal", click: () => {
        window.show();
        window.loadURL(`${website}settings/`);
      },
    },
    /** Show about dialog on click. */
    {
      label: "About", type: "normal", click: () => {
        showDialog([
          `Chatminal (Desktop) v${app.getVersion()}`,
          `Minimalistic chat app for web, terminal, desktop, etc.`,
        ]);
      },
    },
    /** Check for update. */
    {
      label: "Check for update", type: "normal", click: () => {
        checkForUpdate(false);
      },
    },
    { type: "separator" },
    /** Quit the app on click. */
    {
      label: "Quit", type: "normal", click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]));
  /** Open the app on app system tray click. */
  tray.on("click", () => {
    window.show();
  });
}

/** Create the main window of the app. */
function createWindow() {
  /** Destroy window if exists. */
  if (window) {
    window.destroy();
  }
  /** Create a new browser window. */
  window = new BrowserWindow({
    width: 990,
    height: 600,
    darkTheme: true,
    title: "Chatminal",
    autoHideMenuBar: true,
    resizable: false,
    minimizable: true,
    icon: getIcon().png,
  });
  /** Load the chatminal web app into the window. */
  window.loadURL(website);
  /** Handle application closing.*/
  window.on("close", (event) => {
    if (allowTray && !app.isQuitting) {
      event.preventDefault();
      window.hide();
    }
  });
  /** Open external links from OS instead of a new app window. */
  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

/** Set up the app. */
function setupApp() {

  /** Create app system tray and app window when app is ready. */
  app.whenReady().then(() => {
    createTray();
    createWindow();
    checkForUpdate();
    /** open-a-window-if-none-are-open-macos */
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  /** Show the window when app is activated. */
  app.on("activate", () => {
    window.show();
  });

  /** Don't quit the app when all windows are closed. */
  app.on("window-all-closed", (event) => {
    if (allowTray) {
      event.preventDefault();
    } else {
      app.quit();
    }
  });
}

module.exports = {
  window,
  tray,
  allowTray
};
