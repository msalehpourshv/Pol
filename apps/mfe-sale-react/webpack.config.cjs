const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env = {}) => ({
  entry: path.resolve(__dirname, 'src/root.single-spa.tsx'),
  mode: env.production ? 'production' : 'development',
  output: {
    filename: 'mfe-sale-react.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: env.development ? 'http://localhost:9003/' : '',
  },
  devtool: 'source-map',
  devServer: {
    port: 9003,
    static: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: false,
    liveReload: false,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.ejs'),
      inject: false,
    }),
  ],
  externals: ['react', 'react-dom', 'single-spa', 'react-router-dom'],
});
