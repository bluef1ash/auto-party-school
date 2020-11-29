const { join, resolve } = require("path");

const basePath = resolve(__dirname, "..", "..");
const isDev = process.env.NODE_ENV === "development";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const port = process.env.PORT || 8080;
let nodeEnv = "development";
let cssLoader = "style-loader";
const hot = [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${port}/`,
    "webpack/hot/only-dev-server"
];
const entry = {
    index: join(basePath, "src", "renderer", "index", "index.tsx")
};
const plugins = [];
if (isDev) {
    Object.values(entry).forEach(value => hot.concat(value));
    plugins.push(
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    );
} else {
    nodeEnv = "production";
    cssLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: "./" }
    };
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name]/index.style.css",
            publicPath: "../"
        })
    );
}
const htmlWebpackPlugins = Object.keys(entry).map(
    name =>
        new HtmlWebpackPlugin({
            inject: "body",
            scriptLoading: "defer",
            template: join(basePath, "resources", "template", "template.html"),
            minify: false,
            filename: `${name}.html`,
            chunks: [name]
        })
);
plugins.push(
    new webpack.EnvironmentPlugin({
        NODE_ENV: nodeEnv
    }),
    ...htmlWebpackPlugins
);
const rules = [
    {
        test: /\.global\.css$/,
        use: [
            cssLoader,
            {
                loader: "css-loader",
                options: { sourceMap: true }
            },
            "postcss-loader",
            "resolve-url-loader"
        ]
    },
    {
        test: /^((?!\.global).)*\.css$/,
        use: [
            cssLoader,
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    modules: { localIdentName: "[name]__[local]__[hash:base64:5]" },
                    sourceMap: true
                }
            },
            "postcss-loader",
            "resolve-url-loader"
        ]
    },
    {
        test: /\.global\.s[ac]ss$/,
        use: [
            cssLoader,
            {
                loader: "css-loader",
                options: { sourceMap: true }
            },
            "postcss-loader",
            "resolve-url-loader",
            "sass-loader"
        ]
    },
    {
        test: /^((?!\.global).)*\.s[ac]ss$/,
        use: [
            cssLoader,
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    modules: { localIdentName: "[name]__[local]__[hash:base64:5]" },
                    sourceMap: true
                }
            },
            "postcss-loader",
            "resolve-url-loader",
            "sass-loader"
        ]
    },
    {
        test: /\.(?:ico|gif|png|jpe?g|webp)$/,
        use: {
            loader: "url-loader",
            options: { limit: 5000 }
        }
    },
    {
        test: /\.woff2?(\?v=\d+\.\d+\/\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 5000,
                mimetype: "application/font-woff"
            }
        }
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 5000,
                mimetype: "application/octet-stream"
            }
        }
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 5000,
                mimetype: "image/svg+xml"
            }
        }
    }
];
module.exports = {
    entry,
    plugins,
    port,
    rules
};
