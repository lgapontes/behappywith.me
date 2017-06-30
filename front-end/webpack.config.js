const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
    ],
    module: {
        rules: [
        {
            test: /.jsx?$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
            ]
        },
        {
            test: /\.(jpe?g|ico|png|gif|svg)$/i,
            loader: 'file-loader?name=img/[name].[ext]'
        }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    }
};