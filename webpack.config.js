const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|webp|gif)$/i,
                type: "asset",
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        host: "0.0.0.0",
    }
}