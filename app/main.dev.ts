/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import os from 'os'
import { app, BrowserWindow, BrowserView, ipcMain, webContents } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

import express from 'express'

const a = express()
const port = 3000

a.get('/', (req: any, res:any) => {
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  res.send('Hello World!')
})

a.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'debug';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let mainWindowEventObj:any = null

let child:BrowserView | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  console.log(`MODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`DEBUG_PROD: ${process.env.DEBUG_PROD}`)
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 900,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  // BrowserWindow.addDevToolsExtension(
  //   path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  // )
  mainWindow.loadURL(`file://${__dirname}/app.html`);
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      // let child = new BrowserView({
      //   webPreferences: {
      //     nodeIntegration: false
      //   }
      // })
      // child.loadURL('https://www.naver.com')
      // child.show()
      // mainWindow.setBrowserView(child)
      mainWindow.show();
      mainWindow.focus();
      // child.setBounds({ x: 0, y: 300, width: 1024, height: 428 })
      // child.webContents.loadURL('https://electronjs.org')
    }
  });


  mainWindow.on('will-resize', (e, v) => {
    if(!child) return
    child.setBounds({ x: 50, y: 400, width: v.width-50, height: v.height-400 })
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();  
});

ipcMain.on('open-web', (event, arg) => {
  mainWindowEventObj = event.sender
  // event.returnValue = 'pong'
  if (!mainWindow) {
    return
  }
  child = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`
    }
  })
  mainWindow && mainWindow.setBrowserView(child)
  let width =1024
  let height =500

  child.setBounds({ x: 50, y: 400, width: width-50, height })
 
  child.webContents.loadURL(arg.url || 'https://www.naver.com')
  
  child.webContents.openDevTools()
  child.webContents.executeJavaScript(`
    var cssPath = function(el) {
      if (!(el instanceof Element)) 
          return;
      var path = [];
      while (el.nodeType === Node.ELEMENT_NODE) {
          var selector = el.nodeName.toLowerCase();
          if (el.id) {
              selector += '#' + el.id;
              path.unshift(selector);
              break;
          } else {
              var sib = el, nth = 1;
              while (sib = sib.previousElementSibling) {
                  if (sib.nodeName.toLowerCase() == selector)
                    nth++;
              }
              if (nth != 1)
                  selector += ":nth-of-type("+nth+")";
          }
          path.unshift(selector);
          el = el.parentNode;
      }
      return path.join(" > ");
    }

    document.addEventListener('mouseover', (e) => {
      // console.log(e.toElement); 
      // console.log(e.target); 
      // console.log(e.srcElement); 
      // console.log(e.path)

      let isClicked = e.target.classList.contains('clicked-dom')
      if(!isClicked) {
        e.target.style.border = "1px solid red";
      }

      e.target.addEventListener('mouseout', overE => {
        let isClicked = overE.target.classList.contains('clicked-dom')
        console.log('mouseout', overE.target)
        console.log('mouseout', overE.target.classList)
        if (!isClicked) {
          overE.target.style.border = "0"
        }
      })
      e.target.addEventListener('click', clickE => {
        console.log('click', clickE)
        clickE.target.style.border = "2px solid blue";
        try{

          clickE.target.classList.add('clicked-dom')
        } catch (err) {
          console.log(err)
        }

        clickE.preventDefault()
        clickE.stopPropagation()
        try {
          // sendToElectron('query', {
          //   // target: e.target,
          //   // path: e.path
          //   target: cssPath(e.target),
          //   path: e.path.map(path => cssPath(e.path))
          // });
        } catch (err) {
          console.log(err)
        }
      })
    })
  `, true)

})

ipcMain.on('query', function (event, value) {
  mainWindowEventObj.send('selectDom', value)
});