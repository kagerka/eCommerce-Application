const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

console.log(mode + ' mode');

module.exports = {
  mode: mode,
	entry: path.resolve(__dirname, './src/index'),
	output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },
	devtool: 'source-map',
	optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
		new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    }),
		new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
		new HtmlWebpackPlugin({
		template: './src/index.html'
	})],
	module: {
		rules: [
			{
        test: /\.html$/i,
        loader: 'html-loader'
      },
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      //Options
                    }
                  ]
                ]
              }
            }
          },
          'sass-loader',
        ]
      },
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
			{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
		]
	},
}