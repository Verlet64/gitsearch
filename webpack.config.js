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
            {test: /\.ts$/, loaders: ['ts', 'angular2-template-loader']},
            { 
                test: /\.(html|css)$/, 
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new htmlInject({
            template: './src/index.html'
        })
    ]
}