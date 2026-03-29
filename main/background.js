import { app, shell } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const electron = require("electron");
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    resizable: false,
    frame: false,
    autoHideMenuBar: true,
    useContentSize: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      allowRunningInsecureContent: true,
    }
  });

  mainWindow.setBounds({width: 1193, height: 795});
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);

  mainWindow.webContents.on('will-navigate', (event, url) => {
  if (!url.startsWith('app://') && url !== 'about:blank') {
    event.preventDefault();
    shell.openExternal(url);
  }
});

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
