const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
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
      minimize: (argv.mode === 'production') ? true : false,
      splitChunks: {
        name: 'commons',
        chunks: 'initial',
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'initial'
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

  return config;
};
