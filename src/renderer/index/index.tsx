import "@scss/common.global";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { AppContainer as ReactHotContainer } from "react-hot-loader";
import App from "@renderer/index/component/App";

const AppContainer = process.env.NODE_ENV === "development" ? ReactHotContainer : Fragment;

ReactDOM.render(
    <AppContainer>
        <>
            <App />
        </>
    </AppContainer>,
    document.getElementById("app")
);
