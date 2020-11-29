const path = require("path");

const basePath = path.resolve(__dirname, "../..");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const webpackMainDev = require("./webpack.main.dev");

module.exports = webpackMerge.merge(webpackMainDev, {
    devtool: "none",
    mode: "production",
    output: {
        path: path.join(basePath, "dist/main"),
        filename: "main.prod.js"
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production"
        })
    ]
});
