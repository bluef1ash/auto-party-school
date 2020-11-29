import React, { useEffect, useRef } from "react";
import BrowserView from "react-electron-browser-view";

const { resolve } = require("path");
const { ipcRenderer } = require("electron");

export default (): JSX.Element => {
    const browserView = useRef<HTMLElement>(null);
    let browserViewCurrent: HTMLElement | null;
    useEffect(() => {
        browserViewCurrent = browserView.current;
    }, []);
    return (
        <>
            <BrowserView
                style={{ height: "100%", width: "100%" }}
                src="http://ytwldx.soocedu.com/index.php/home/Index/index.html"
                webpreferences={{
                    nodeIntegration: true,
                    preload: resolve("./src/renderer/index/preload.js"),
                    useragent:
                        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
                }}
                devtools
                ref={browserView}
            />
        </>
    );
};
