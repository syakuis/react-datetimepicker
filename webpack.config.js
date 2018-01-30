const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');
const pkg = require('./package.json');

const {
  src, output, filename, library, externals,
} = pkg.config;

module.exports = merge(base(), {
  entry: {
    [filename]: `./${src}/index.js`,
    [`${filename}.min`]: `./${src}/index.js`,
  },
  externals,
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library,
  },
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
    new CleanWebpackPlugin([output]),
  ],
});
