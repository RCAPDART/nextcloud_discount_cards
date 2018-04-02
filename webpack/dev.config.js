/* eslint-disable no-undef */
const path = require('path');
var relativeAssetsPath = '../build';
var assetsPath = path.join(__dirname, relativeAssetsPath);
var webpack = require('webpack');

// Webpack configuration
module.exports = {
    entry: './js/index.jsx',
    output: {
        path: assetsPath,
        filename: 'main.js',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: {} }),
        new webpack.DefinePlugin({
            'process.env': {
                PUBLIC_URL: '"/public"',
            },
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true
        })
    ],
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};