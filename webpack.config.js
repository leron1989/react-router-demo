const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
    entry: {
        app:'./src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer:{
        //上下文根目录
        contentBase: './dist'
    },
    // optimization: {
    //     runtimeChunk: {
    //         name: "manifest"
    //     },
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         title: 'react router demo'
    //     })
    // ],
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
                // loaders: 'babel-loader',
                query: {
                    presets:['es2015', 'react'],
                    plugins: [
                        ["import", {libraryName: "antd", style: "css"}]
                    ]
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            }
        ]
    }
}