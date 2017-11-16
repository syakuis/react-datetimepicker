/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = base({ entry: './src/demo/index.js' });
