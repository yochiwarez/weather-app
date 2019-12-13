/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  watch: false,
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ['@babel/env', {
            targets: {
              browsers: 'last 2 chrome versions',
            },
          }],
        ],
      },

    },
    {
      test: /.css?$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/images/',
        // the images will be emited to dist/assets/images/ folder
      },
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src'],
        },
      },
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!php*', '!php/**/*', '!.git*', '!.git/**/*', '!robots.txt'],
    }),
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      },
    ),
  ],
  performance: { hints: false },
};
