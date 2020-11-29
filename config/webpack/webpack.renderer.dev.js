const webpackMerge = require("webpack-merge");
const { spawn } = require("child_process");
const { entry, plugins, port, rules } = require("./webpack.variable");
const webpackCommon = require("./webpack.common");

module.exports = webpackMerge.merge(webpackCommon, {
    devtool: "inline-source-map",
    mode: "development",
    target: "electron-renderer",
    entry,
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    output: {
        filename: "[name].dev.js",
        publicPath: `http://localhost:${port}/dist`
    },
    module: {
        rules
    },
    plugins,
    devServer: {
        before() {
            spawn("yarn", ["run", "dev-main"], {
                shell: true,
                env: process.env,
                stdio: "inherit"
            })
                .on("close", code => process.exit(code))
                .on("error", spawnError => console.error(spawnError));
        }
    }
});
