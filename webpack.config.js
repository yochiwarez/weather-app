const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    extensions: ['.json', '.js', '.jsx'],
  },
});
