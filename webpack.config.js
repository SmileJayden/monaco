const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: path.join(__dirname, 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_module/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new HTMLplugin({
      template: './index.html',
      title: 'Monaco Editor Sample',
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'css', 'html', 'typescript'],
    }),
  ],
};
