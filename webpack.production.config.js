const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/static/',
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 10000,
            automaticNameDelimiter: "_",
        }
    },
    module: {
        rules: [
            {
                test: /\.(xml)$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env'],
                        plugins: [ 'transform-class-properties' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader',
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*'),
            ]
        }),
        new HtmlWebpackPlugin({
            filename: "hello-world.html",
            chunks: ['hello-world', 'vendors-hello-world-kiwi'],
            title: 'Hello world',
            template: 'src/page-template.hbs',
            description: 'Html',
        }),
        new HtmlWebpackPlugin({
            filename: "kiwi.html",
            chunks: ['kiwi', 'vendors-hello-world-kiwi'],
            title: 'Kiwi',
            template: 'src/page-template.hbs',
            description: 'Kiwi',
        }),
    ]
}