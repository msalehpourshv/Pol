const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env = {}) => ({
  mode: env.production ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/main.single-spa.ts'),
  output: {
    filename: 'mfe-base-angular.js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'dist'),
    publicPath: env.development ? 'http://localhost:9002/' : '',
  },
  devtool: 'source-map',
  devServer: {
    port: 9002,
    static: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.ejs'),
      inject: false,
    }),
  ],
  externals: ['single-spa', 'rxjs', 'zone.js', '@angular/core', '@angular/common', '@angular/router'],
});
