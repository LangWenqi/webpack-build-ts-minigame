const path = require('path');
const  webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => ({
  mode: env.NODE_ENV === 'dev' ? 'development' : 'production',
  entry: {
    bfsdk: './src/bfsdk.ts',
    'bfsdk.min': './src/bfsdk.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd', // CMD 仅NODE，AMD仅浏览器，UMD同时支持
    // 　libraryTarget：为了支持多种使用场景，我们需要选择合适的打包格式。libraryTarget 属性。这是可以控制 library 如何以不同方式暴露的选项。
    umdNamedDefine: true,
    sourceMapFilename: '[name].map',
    library: 'BFSDK'
  },
  externals: {
   
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /min/,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [
          '/node_modules/'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          '/node_modules/'
        ]
      }
    ]
  },
  plugins:[
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // devtool: 'source-map'
});