const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
//require('offline-plugin/runtime').install();

plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    }),
    new ExtractTextPlugin('style.css'),
    new OfflinePlugin({        
        caches: {
            main: [
            '*.html',
            '*.css',
            '*.js',
            ]            
        }
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },    
    resolve: {
        extensions: [".js",".jsx"]
    },
    plugins: plugins,
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
            test: /\.(jpe?g|ico|png|gif|eot|woff|woff2|ttf|svg)$/i,
            loader: 'file-loader?name=img/[name].[ext]'
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    }
};