const devEnvs = ["development", "production"];
const devPlugins = [require("react-hot-loader/babel")];
const prodPlugins = [
    require("@babel/plugin-transform-react-constant-elements"),
    require("@babel/plugin-transform-react-inline-elements"),
    require("babel-plugin-transform-react-remove-prop-types")
];

module.exports = api => {
    const development = api.env(devEnvs);
    return {
        presets: [
            [
                require("@babel/preset-env"),
                {
                    targets: {
                        electron: "v9.2.1"
                    },
                    useBuiltIns: "usage",
                    corejs: "2"
                }
            ],
            require("@babel/preset-typescript"),
            [
                require("@babel/preset-react"),
                {
                    development,
                    throwIfNamespace: false
                }
            ]
        ],
        plugins: [
            [
                require("@babel/plugin-proposal-class-properties"),
                {
                    loose: false
                }
            ],
            require("@babel/plugin-syntax-dynamic-import"),
            require("@babel/plugin-syntax-import-meta"),
            [
                require("@babel/plugin-transform-runtime"),
                {
                    absoluteRuntime: false,
                    corejs: "2",
                    helpers: true,
                    regenerator: true,
                    useESModules: false
                }
            ],
            /* [
                require("import"),
                {
                    libraryName: "antd"
                }
            ], */
            [
                require("@babel/plugin-proposal-optional-chaining"),
                {
                    loose: false
                }
            ],
            [
                require("@babel/plugin-proposal-decorators"),
                {
                    legacy: true
                }
            ],
            require("@babel/plugin-proposal-object-rest-spread"),
            ...(development ? devPlugins : prodPlugins)
        ]
    };
};
