const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
var path = require('path');
const Package = require('./package');

var developmentPath = path.resolve(__dirname, 'buid/dev');
var productionChromePath = path.resolve(__dirname, 'buid/chrome');
var productionMozPath = path.resolve(__dirname, 'buid/moz');

var buildPath = process.env.NODE_ENV === undefined ? developmentPath : process.env.NODE_ENV === "chrome" ? productionChromePath : productionMozPath;

var browserType = process.env.NODE_ENV === "moz" ? "browser" : "chrome";

var browserConfig = process.env.NODE_ENV === "moz" ? "./app/browser/moz/manifest.json" : "./app/browser/chrome/manifest.json";

module.exports = (env, argv) => {
 return {
  mode: argv.mode === undefined ? 'development' : 'production',
  entry: {
   logic: './app/assets/js/main.js',
   popup: './app/interface/js/popup.js',
   content: './app/assets/js/content/content.js'
  },
  output: {
   filename: 'js/[name].bundle.js',
   sourceMapFilename: 'sourceMap/[name].map',
   path: buildPath
  },
  devtool: 'source-map',
  module: {
   rules: [{
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
   }, {
    test: /\.scss$/,
    use: [
     "style-loader",
     "css-loader",
     "sass-loader"
    ]
   }]
  },
  plugins: [
   new webpack.DefinePlugin({
    WEBPACK_BROWSER_TYPE: JSON.stringify(browserType)
   }),

   new CopyWebpackPlugin([

    browserConfig,
    {
     from: './app/assets/images/',
     to: 'images',
     toType: 'dir',
     flatten: false
    },
    {
     from: './node_modules/jsstore/dist/jsstore.worker.min.js',
     to: 'vendor',
     toType: 'dir',
     flatten: false
    }

   ]),
   new HtmlWebpackPlugin({
    filename: 'popup.html',
    title: 'Project Tabber',
    template: './app/interface/popup.html',
    chunks: ['popup'],
    hash: true,
    minify: {
     collapseWhitespace: true,
     removeComments: true,
     removeRedundantAttributes: true,
     removeScriptTypeAttributes: true,
     removeStyleLinkTypeAttributes: true,
     useShortDoctype: true
    }
   })
  ]
 }
};