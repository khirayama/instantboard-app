const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  entry: './src/index.web.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/public',
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
  plugins: [],
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
