
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const base = (args) => {
  const config = Object.assign(pkg.config, args);
  const {
    entry, publicPath, output, src, filename,
  } = config;

  return {
    entry,
    output: {
      path: path.join(__dirname, output),
      publicPath,
      filename: `${filename}.js`,
    },

    plugins: [
      new ExtractTextPlugin({
        filename: `${filename}.css`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: path.join(__dirname, src),
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: process.env.NODE_ENV === 'production',
                  sourceMap: process.env.NODE_ENV === 'production',
                  importLoaders: 1,
                },
              },
            ],
          }),
        },
        {
          test: /\.module\.css$/,
          include: path.join(__dirname, src),
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: process.env.NODE_ENV === 'production',
                  sourceMap: process.env.NODE_ENV === 'production',
                  camelCase: true,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            ],
          }),
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=images/`,
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=${publicPath}&outputPath=fonts/`,
        },
        // file-loader 와 함께 사용하면 제대로 처리되지 않음.
        // {
        //   test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
        //   use: {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000, // 10kb
        //     },
        //   },
        // },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, src),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: true,
            },
          },
        },
      ],
    },

    // 자주 사용되는 경로를 정의한다.
    resolve: {
      alias: {
        _resources: path.resolve(__dirname, `${src}/resources`),
        // _commons: path.resolve(__dirname, `${src}/commons`),
        // _entrypoint: path.resolve(__dirname, `${src}/entrypoint`),
        _components: path.resolve(__dirname, `${src}/components`),
        // _layouts: path.resolve(__dirname, `${src}/layouts`),
        // _apps: path.resolve(__dirname, `${src}/apps`),
        // _containers: path.resolve(__dirname, `${src}/containers`),
        // _utils: path.resolve(__dirname, `${src}/utils`),
        // _actions: path.resolve(__dirname, `${src}/actions`),
        // _reducers: path.resolve(__dirname, `${src}/reducers`),
      },
    },
  };
};

module.exports = base;
