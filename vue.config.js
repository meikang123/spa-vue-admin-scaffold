const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    port: 9111
  },

  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        APP_ENV: JSON.stringify(process.env.APP_ENV) || JSON.stringify('development')
      })
    ]
  },

  chainWebpack: config => {
    config
      .module
      .rule('ts')
      .test(/.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();
    config
      .module
      .rule('jsx')
      .test(/.jsx$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end();

    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
