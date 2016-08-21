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
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    plugins: [
        new htmlInject({
            template: './src/index.html'
        })
    ]
}