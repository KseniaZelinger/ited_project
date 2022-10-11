const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                "test": /\.(png|jpe?g|gif|svg)$/i,
                "type": "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
          inject: 'body',
          template: './src/index.html',
          filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: "src/img/ited_new_logo.svg",
                to({ context, absoluteFilename }) {
                  return "../dist/img/[name][ext]";
                },
              },
            ],
        }),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
}