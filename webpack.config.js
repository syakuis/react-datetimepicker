/**
 * @date 2017-02-03 11:46:07
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
const webpack = require('webpack');

const merge = require('webpack-merge');

const base = require('./webpack.base.config');
const pkg = require('./package.json');
const { port, publicPath, dist, src, entry, filename, externals } = pkg.config;

module.exports = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
});
