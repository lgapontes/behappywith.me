const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
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
        }
        ]
    }
};