/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const base = require('./webpack.base.config');

module.exports = merge(base({ entry: './src/demo/index.js', dist: 'demo' }), {
  plugins: process.env.NODE_ENV === 'production' ? [new CleanWebpackPlugin(['demo'])] : [],
});
