const path = require('path');
const { merge } = require('webpack-merge');
const sharedWebpackConfig = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');
const HtmlWebPackPlugin = require('html-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    publicPath: 'http://localhost:3002/client/',
  },
  plugins: [
    moduleFederationPlugin.client,
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};


const devServer = {
  static: path.resolve(__dirname, '../dist'),
  compress: false,
  historyApiFallback: true,
  port: 3002,
  hot: true,
  allowedHosts: 'all', // Use if inter-Docker container service communication (ie. 'http://my_docker_service:3999/bla')
  devMiddleware: {
    writeToDisk: true,
  },
  historyApiFallback: {
    disableDotRule: true,
    index: '/client/index.html', // Make sure it points to '/client/index.html'
  },
};

// TO DO: integrate switch from webpack config production/development
const isDevServer = true;
const webpackConf = isDevServer ? { ...webpackConfig, devServer } : webpackConfig;

module.exports = merge(sharedWebpackConfig, webpackConf);
