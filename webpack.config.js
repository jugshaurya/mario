// Imports: Dependencies
const path = require('path');
const HtmlWebPackPlugin =  require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
require('@babel/register');
// Webpack Configuration
const config = {
  
  // Entry - Erbpack4 handles that apne aap
  // entry: './src/index.js',
  // // Output - where our transpiled file will go
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: 'main.js',
  // },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
          loader : 'html-loader',
          options: { minimize: true }
          }
        ],
      }
    ]
  },
  // Plugins
  plugins: [
      new HtmlWebPackPlugin({
          template: './src/index.html',
          filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  ],
};
// Exports
module.exports = config;