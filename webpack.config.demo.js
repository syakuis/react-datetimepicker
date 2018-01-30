const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');


const pkg = require('./package.json');

const {
  src,
} = pkg.config;

module.exports = merge(base({ entry: `./${src}/demo/index.js`, output: 'demo' }), {
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${src}/index.html`,
    }),
    new CleanWebpackPlugin(['demo']),
  ],
});
