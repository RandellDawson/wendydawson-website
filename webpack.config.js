const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  mode: process.env.NODE_ENV || 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              [
                "@babel/preset-env",
                {
                  "modules": false,
                  "useBuiltIns": "usage",
                  "corejs": 2,
                  "targets": {
                    "browsers": [">0.25%", "not dead", "ie >= 11"]
                  }
                }
              ]
            ]
          }
        }
      },
      // bundle CSS into a single CSS file, auto-generating -vendor-prefixes
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv(/* pluginOptions */)
              ]
            }
          }
        ],
      },
    ]
  },
  plugins: ([
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/', ignore: ['js/*'] },
    ]),
    // Avoid publishing files when compilation failed:
    new webpack.NoEmitOnErrorsPlugin(),

    // Write out CSS bundle to its own file:
    new MiniCssExtractPlugin()
  ]).concat(process.env.WEBPACK_ENV === 'dev' ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]),

  // Pretty terminal output
  stats: { colors: true },

  // Generate external sourcemaps for the JS & CSS bundles
  devtool: 'source-map',

  // `webpack-dev-server` spawns a live-reloading HTTP server for your project.
  devServer: {
    port: process.env.PORT || 8080,
    contentBase: './src',
    historyApiFallback: true,
    staticOptions: {
      extensions: ['html']
    }
  }
};