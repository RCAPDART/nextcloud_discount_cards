var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = '../build';
var assetsPath = path.join(__dirname, relativeAssetsPath);
process.env.NODE_ENV = 'development';

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
		'main': './js/index.js'
  },
  //output: { path: __dirname, filename: 'bundle.js' },
  output: {
	path: assetsPath,
	filename: '[name].js',
	chunkFilename: '[name]-[chunkhash].js',
	publicPath: '/dist/'
  },
  module: {
    loaders: [
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
		}
    ]
  },
  resolve: {
	   modules: [
	   	  'src',
	   	  'node_modules'
	   ],
	   extensions: ['.json', '.js']
   },
	plugins: [
		new CleanPlugin([relativeAssetsPath]),
		new ExtractTextPlugin("[name].css"),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		}),

		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// set global vars
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('development')
			}
		}),

		// optimizations
		// new webpack.optimize.DedupePlugin(),
		//new webpack.optimize.OccurenceOrderPlugin(), 
		new webpack.optimize.UglifyJsPlugin({
			//compress: {warnings: false}
			compress: false,
			mangle: false,
		})
	]
};