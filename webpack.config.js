const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  entry: {
    mobile: './src/index.mobile.tsx',
    desktop: './src/index.desktop.tsx',
  },
  output: {
    filename: 'bundle.[name].js',
    path: __dirname + '/dist/public',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        },
        common: {
          test: /src/,
          name: 'common',
          chunks: 'initial',
          enforce: true
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.web.json',
        },
      },
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(Object.assign({}, process.env)),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.web.json',
      }),
    ],
  }
};

if (process.env.ANALYSIS === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
