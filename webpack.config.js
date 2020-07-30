const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, options) => {
  const config = {
    entry: path.join(__dirname, 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].bundle.js',
    },
    mode: options.mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          // exclude: /node_modules/,
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
          test: /\.(woff|woff2|ttf|eot|svg)$/,
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

  if (options.mode === 'production') {
    config.plugins = [...config.plugins, new CleanWebpackPlugin()];
  } else {
    config.devtool = 'eval-source-map';
  }

  if (process.env.ANALYZE) {
    config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
  }

  return config;
};
