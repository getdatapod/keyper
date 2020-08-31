const { app, Tray, Menu, ipcMain, shell, protocol } = require('electron');
const { server } = require('./server');
const path = require('path');

let tray;
let contextMenu;

// Setting assets path based on if the app is packaged or in development
const assetsPath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : 'assets';

// Fire when the electron app is ready
app.on('ready', () => {
  // Open app inside the browser
  openInBrowser();

  // Create a tray with tray icon from assets directory
  tray = new Tray(`${assetsPath}/keyper.png`);

  // Setting tooltip to the tray icon
  tray.setToolTip('Keyper');

  // Adding menu for performing functions using tray icon
  // e.g., Closing server
  contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open in browser',
      click() {
        openInBrowser();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit',
      click() {
        handleServer();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
});

app.setAsDefaultProtocolClient('keyper');
// Function to handle closing of server and electron app
const handleServer = () => {
  server.close();
  app.quit();
};

const openInBrowser = () => {
  shell.openExternal('http://localhost:4242');
};
