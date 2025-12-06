const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env = {}) => ({
  entry: path.resolve(__dirname, 'src/root-config.ts'),
  mode: env.production ? 'production' : 'development',
  output: {
    filename: 'root-config.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: env.development ? 'http://localhost:9000/' : '',
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    static: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: false,
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      inject: false,
    }),
  ],
  externals: ['single-spa', 'react', 'react-dom', 'rxjs', 'zone.js', '@angular/core', '@angular/common', '@angular/platform-browser'],
});
