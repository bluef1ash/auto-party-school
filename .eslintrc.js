const path = require("path");

module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        "eslint:recommended",
        "eslint-config-airbnb",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/babel",
        "prettier/react"
    ],
    plugins: ["import", "prettier"],
    settings: {
        "import/resolver": {
            webpack: {
                config: path.resolve(__dirname, "config/webpack/webpack.common.js")
            }
        }
    },
    overrides: [
        {
            files: ["*.js", "*.jsx"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": 0
            }
        },
        {
            files: ["*.config.js", "webpack/*.js"],
            rules: {
                "global-require": 0
            }
        },
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/ban-ts-ignore": 0
            }
        }
    ],
    rules: {
        // 禁止使用 var
        "no-var": 2,
        // 不允许在变量赋值之外使用常量数值。当没有指定允许值列表时，默认允许-1,0和1
        "no-magic-numbers": 0,
        // for if do while 要有括号
        curly: 2,
        // 不允许使用按位运算符
        "no-bitwise": 0,
        // 不允许在do-while/for/if/while判断语句中使用赋值语句
        "no-conditional-assignment": 0,
        // 不能使用console
        "no-console": 0,
        // 不允许使用debugger
        "no-debugger": 0,
        // 不允许空的块
        "no-empty": 2,
        // 不允许使用eval
        "no-eval": 0,
        // 不允许在非class中使用 this关键字
        "no-invalid-this": 2,
        // 不允许return await
        "no-return-await": 2,
        // 箭头函数定义的参数需要括号
        "arrow-parens": [2, "as-needed"],
        // 引号的使用规则
        quotes: [2, "double", { avoidEscape: true }],
        // 分号的使用规则
        semi: [2, "always"],
        // 使用Tab进行缩进，每次强制缩进2个字符
        indent: [2, 4, { SwitchCase: 1 }],
        "react/jsx-indent": [2, 4],
        eqeqeq: [2, "always"],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
        "@typescript-eslint/no-var-requires": 0,
        "import/no-unresolved": [2, { ignore: ["electron"] }],
        "linebreak-style": 0,
        "react/prefer-stateless-function": 0,
        "comma-dangle": [2, "never"],
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "@typescript-eslint/ban-ts-comment": 0
    },
    env: {
        browser: true,
        node: true,
        commonjs: true,
        "shared-node-browser": true,
        es6: true,
        worker: true,
        mocha: true,
        jasmine: true,
        jest: true,
        phantomjs: true,
        protractor: true,
        qunit: true,
        jquery: true,
        prototypejs: true,
        shelljs: true,
        meteor: true,
        mongo: true,
        applescript: true,
        nashorn: true,
        serviceworker: true,
        atomtest: true,
        embertest: true,
        webextensions: true,
        greasemonkey: true
    }
};
