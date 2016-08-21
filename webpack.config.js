var webpack = require('webpack');
var htmlInject = require('html-webpack-plugin');

module.exports = {
    entry: {
        'app': './src/main.ts',
        'polyfills': './src/polyfills.ts'
    },
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    plugins: [
        new htmlInject({
            template: './src/index.html'
        })
    ],
    styles: [require('./src/app/details/details.style.css')]
}