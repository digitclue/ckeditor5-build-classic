const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    main: [
      './sample/main.ts',
    ]
  },

  output: {
    path: path.resolve(__dirname, 'sample/dist'),
    filename: 'scripts/[name].[hash].js',
  },

  plugins: [
    new CKEditorWebpackPlugin({
      language: 'en',
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'sample/index.html',
    }),
  ],

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          },
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'sample/dist'),
    index: 'main.html',
  },
};
