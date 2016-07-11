'use strict';
const path = require('path'),
      CleanPlugin = require('clean-webpack-plugin'),
      autoprefixer = require('autoprefixer');

const config = {
    entry: './index.js',
    devtool: 'sourcemap',
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules'
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-object-rest-spread']
            }
        }, {
            test: /\.html$/,
            loader: 'file',
            query: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.scss$/,
            loader: `style-loader!css-loader?sourceMap!postcss-loader!sass-loader?includePaths[]=${encodeURIComponent(path.resolve(__dirname, './node_modules'))}`
        }]
    },
    postcss: () => [
        autoprefixer({ browsers: ['last 2 versions'] })
    ],
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'script.js'
    },
    devServer: {
        contentBase: 'dist'
    },
    plugins: [
        new CleanPlugin(['dist'])
    ]
};

module.exports = config;
