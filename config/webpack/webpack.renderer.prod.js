const path = require("path");

const basePath = path.resolve(__dirname, "../..");
const webpackMerge = require("webpack-merge");
const webpackVariable = require("./webpack.variable");
const webpackCommon = require("./webpack.common");

module.exports = webpackMerge.merge(webpackCommon, {
    devtool: "none",
    mode: "production",
    target: "electron-preload",
    entry: webpackVariable.entry,
    output: {
        path: path.join(basePath, "dist/renderer/"),
        publicPath: "../",
        filename: "[name]/index.prod.js"
    },
    module: {
        rules: webpackVariable.rules
    },
    plugins: webpackVariable.plugins
});
