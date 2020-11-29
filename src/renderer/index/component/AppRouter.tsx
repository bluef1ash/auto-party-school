import Home from "@renderer/index/component/Home";
import Setting from "@renderer/index/component/Setting";
import React, { useState } from "react";
// @ts-ignore
import { Toolbar, ToolbarNav, ToolbarNavItem } from "react-desktop/macOs";
import { HashRouter, Route, Switch } from "react-router-dom";
/// <reference path="react-desktop.d.ts"/>

export default (): JSX.Element => {
    const [selected, setSelected] = useState(0);
    const circle = (
        <svg x="0px" y="0px" width="25px" height="25px" viewBox="0 0 25 25">
            <circle cx="12.5" cy="12.5" r="12.5" />
        </svg>
    );

    const star = (
        <svg x="0px" y="0px" width="25px" height="23.8px" viewBox="0 0 25 23.8">
            <polygon points="12.5,0 16.4,7.8 25,9.1 18.8,15.2 20.2,23.8 12.5,19.7 4.8,23.8 6.2,15.2 0,9.1 8.6,7.8 " />
        </svg>
    );

    return (
        <HashRouter>
            {" "}
            <Toolbar>
                {" "}
                <ToolbarNav>
                    {" "}
                    <ToolbarNavItem
                        title="用户登录"
                        icon={circle}
                        selected={selected === 0}
                        onClick={() => setSelected(0)}
                        href="#/"
                    />{" "}
                    <ToolbarNavItem
                        title="学习"
                        icon={star}
                        selected={selected === 1}
                        onClick={() => setSelected(1)}
                        href="#/home"
                    />{" "}
                </ToolbarNav>{" "}
            </Toolbar>{" "}
            <Switch>
                {" "}
                <Route path="/" exact component={Setting} /> <Route path="/home" component={Home} />{" "}
            </Switch>{" "}
        </HashRouter>
    );
};
