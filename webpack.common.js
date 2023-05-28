const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i, 
        type: 'asset/resource',
        loader: 'file-loader', 
        options: { 
            name: '[name].[ext]',
            outputPath: 'images',
            publicPath: 'images',
            emitFile: true,
            // url: false,
            esModule: false
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
    }),
    new NodePolyfillPlugin()
  ],
};