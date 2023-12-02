// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("actions",{
    quit:()=>ipcRenderer.invoke("quit"),
    minimize:()=>ipcRenderer.invoke("minimize"),
    maximize:()=>ipcRenderer.invoke("maximize"),
    save:(data)=>ipcRenderer.invoke("save",data),
    message:()=>ipcRenderer.invoke("message")
})