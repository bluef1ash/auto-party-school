const { join, resolve } = require("path");

const resourcesPath = resolve(__dirname, "..", "..", "resources");
const { BannerPlugin, DefinePlugin } = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { cacheDirectory: true }
                }
            },
            {
                test: /\.node$/,
                exclude: /node_modules/,
                use: "node-loader"
            }
        ]
    },
    plugins: [
        new BannerPlugin("@author 廿二月的天 < liangtian_2005@163.com>"),
        new DefinePlugin({
            "process.env": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        alias: {
            "@base": resolve(__dirname, "..", ".."),
            "@src": resolve(__dirname, "..", "..", "src"),
            "@mainProcess": resolve(__dirname, "..", "..", "src", "main"),
            "@renderer": resolve(__dirname, "..", "..", "src", "renderer"),
            "@scss": join(resourcesPath, "scss"),
            "@image": join(resourcesPath, "image"),
            "@font": join(resourcesPath, "font"),
            "@library": join(resourcesPath, "library"),
            "@config": resolve(__dirname, "..")
        },
        modules: [resolve("node_modules")],
        extensions: [".js", ".css", ".jsx", ".ts", ".tsx", ".scss", ".json", ".node"]
    },
    optimization: {
        splitChunks: {
            minChunks: 1,
            cacheGroups: {}
        }
    }
};
