const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // Enable CSS Modules
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new Dotenv(), // Loads environment variables from a .env file
  ],
  devtool: 'source-map', // Enable source maps for better debugging
  devServer: {
    historyApiFallback: true,
    open: true, // Automatically open the browser
    port: 3000, // Default port for development server
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Split vendor and application code into separate bundles
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`, // Add a runtime chunk to manage module loading
    },
  },
};
