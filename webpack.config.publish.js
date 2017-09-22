/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');

const base = require('./webpack.base.config');
const config = require('./webpack.config');
const pkg = require('./package.json');
const { port, publicPath, dist, src, entry, filename, externals } = pkg.config;

module.exports = merge(base, config, {
  externals, 
  plugins: [
    new CleanWebpackPlugin([dist]),
  ],
});
