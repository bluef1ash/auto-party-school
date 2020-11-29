const { join, resolve } = require("path");

const basePath = resolve(__dirname, "..", "..");
const { EnvironmentPlugin } = require("webpack");
const webpackMerge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const webpackCommon = require("./webpack.common");

module.exports = webpackMerge.merge(webpackCommon, {
    devtool: "none",
    mode: "development",
    target: "node",
    entry: join(basePath, "src/main/index.ts"),
    output: {
        path: join(basePath, "dist/main"),
        filename: "main.dev.js"
    },
    externals: [nodeExternals()],
    plugins: [
        new EnvironmentPlugin({
            NODE_ENV: "development"
        })
    ],
    node: {
        __dirname: false,
        __filename: false
    }
});
