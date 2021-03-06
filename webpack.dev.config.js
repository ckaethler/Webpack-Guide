const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000,
        writeToDisk: true,
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
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*'),
            ]
        }),
        new HtmlWebpackPlugin({
            filename: "hello-world.html",
            chunks: ['hello-world'],
            title: 'Hello world',
            template: 'src/page-template.hbs',
            description: 'Html',
        }),
        new HtmlWebpackPlugin({
            filename: "kiwi.html",
            chunks: ['kiwi'],
            title: 'Kiwi',
            template: 'src/page-template.hbs',
            description: 'Kiwi',
        }),
    ]
}