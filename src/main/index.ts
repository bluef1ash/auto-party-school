import { app, BrowserWindow, ipcMain, Menu } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS } from "electron-devtools-installer";

const { resolve } = require("path");
const port = process.env.PORT || 8080;
let window: BrowserWindow | null = null;
console.log(process.env.PORT);
const createWindow = (): void => {
    const htmlFilename = "index";
    window = new BrowserWindow({
        height: 900,
        width: 1260,
        resizable: false,
        useContentSize: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    });
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    window
        .on("close", () => {
            window = null;
        })
        .webContents.on("render-process-gone", () => console.error("crash"));
    if (process.env.NODE_ENV === "development") {
        window.loadURL(`http://localhost:${port}/dist/${htmlFilename}.html#/`).catch(console.error);
        window.webContents.openDevTools({ mode: "detach" });
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF])
            .then(name => console.log(`Added Extension: ${name}`))
            .catch(err => console.error("An error occurred: ", err));
    } else {
        window.loadFile(resolve(__dirname, "..", "renderer", htmlFilename, "#/")).catch(console.error);
    }
};

// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
    app.quit();
}
app.on("ready", createWindow)
    .on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
    .on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
ipcMain.on("window-min", () => {
    if (window !== null) {
        window.minimize();
    }
});
// 接收关闭命令
ipcMain.on("window-close", () => {
    if (window !== null) {
        window.close();
    }
});
