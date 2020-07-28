console.log('preload.js 1')
let { ipcRenderer } = require('electron');
console.log('preload.js 2')
window.sendToElectron= function (channel, value) {
  console.log(channel, value)
  ipcRenderer.send(channel, value)
}

ipcRenderer.on('dom-border-color', (e, value) => {
  let { selector, color } = value
  console.log(selector)
  console.log(color)
  document.querySelector(selector).style.border = `1px solid ${color}`
})