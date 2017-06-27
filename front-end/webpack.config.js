const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new ExtractTextPlugin('style.css')
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
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public"
    }
};