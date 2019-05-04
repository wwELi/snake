
const htmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/ww';

module.exports = function () {

  return {
    entry: './index.js',
    output: {
      filename: '[name].js',
      publicPath
    },
    devServer: {
      open: true,
      port: 9000,
      hot: true,
      publicPath,
      clientLogLevel: 'warning',
      // public: 'http://localhost:9000/ww/index.html'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.png$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './index.html'
      })
    ],
  }

};
