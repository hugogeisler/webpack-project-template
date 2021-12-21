const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { DefinePlugin } = require("webpack")

// Paramètre du projet
const racinePath = "../../"
const envPath = "./.env"
const config = require("dotenv").config({ path: path.resolve(__dirname, envPath) }).parsed

// Configuration global
const globalConfig = {
    mode: config.WP_MODE,
    entry: {
        [config.PROJECT_NAME]: path.resolve(__dirname, `${racinePath}/scripts/${config.ENTRY}`),
    }, 
    devtool: config.DEVTOOLS,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            }, 
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            "process.env": config
        }),
        new MiniCssExtractPlugin({
            filename: `${config.PROJECT_NAME}.css`
        })
    ]
}

// Exportation dans le projet
const distFolderConfig = Object.assign({}, globalConfig, {
    output: {
        path: path.resolve(__dirname, `${racinePath}/dist`),
        filename: `${config.PROJECT_NAME}.js`,
        clean: true
    },
})

/*
    // Exportation dans le repertoire public
    const publicFolderConfig = Object.assign({}, globalConfig, {
        output: {
            path: path.resolve(__dirname, `URL_TO_PUBLIC_PATH`),
            filename: `${config.PROJECT_NAME}.js`,
            clean: true
        },
    })
*/

module.exports = [
    distFolderConfig,
    /* publicFolderConfig, */ 
]
