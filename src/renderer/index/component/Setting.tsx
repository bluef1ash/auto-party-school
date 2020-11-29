import React, { useEffect } from "react";
// @ts-ignore
import { Button, Checkbox, TextInput } from "react-desktop/macOs";
import Setting from "../../../../resources/scss/index/setting.scss";
/// <reference path="react-desktop.d.ts"/>

const { ipcRenderer } = require("electron");

export default (): JSX.Element => {
    useEffect(() => {
        // handleOpenDB("database", "user")
    }, []);
    const checkBoxChange = (event: Event) => {};
    const start = (event: Event) => {
        ipcRenderer.sendToHost("11111");
    };
    return (
        <ul className={Setting.user}>
            <li>
                <TextInput label="用户名" placeholder="请输入用户名" />
            </li>
            <li>
                <TextInput label="密码" placeholder="请输入密码" password />
            </li>
            <li>
                <Checkbox label="保存密码" onChange={checkBoxChange} defaultValue="1" defaultChecked />
            </li>
            <li>
                <Button color="blue" onClick={start}>
                    开始
                </Button>
            </li>
        </ul>
    );
};
