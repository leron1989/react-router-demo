var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        //webpack 4 不支持loaders[]写法
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                query: {
                    presets:['es2015', 'react']
                }
            }
        ]
    }
}