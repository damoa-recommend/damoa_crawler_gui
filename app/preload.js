console.log('preload.js 1')
let { ipcRenderer } = require('electron');
console.log('preload.js 2')
window.sendToElectron= function (channel, value) {
  console.log(channel, value)
  ipcRenderer.send(channel, value)
}