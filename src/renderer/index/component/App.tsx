import React from "react";
// @ts-ignore
import { TitleBar, Window } from "react-desktop/macOs";
import { ipcRenderer } from "electron";
import AppRouter from "@renderer/index/component/AppRouter";
/// <reference path="react-desktop.d.ts"/>

export default (): JSX.Element => {
    const close = (): void => {
        ipcRenderer.send("window-close");
    };

    const minimize = (): void => {
        ipcRenderer.send("window-min");
    };

    return (
        <>
            <Window chrome padding="12px" horizontalAlignment="center" verticalAlignment="center">
                {" "}
                <TitleBar
                    title="汽车之家自动运维小工具"
                    controls
                    onCloseClick={close}
                    onMinimizeClick={minimize}
                />{" "}
                <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", width: "100vw" }}>
                    <AppRouter />{" "}
                </div>
            </Window>
        </>
    );
};
