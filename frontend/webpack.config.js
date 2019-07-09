const webpack= require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const liveReloadPlugin = require('webpack-livereload-plugin')
const directoryPath = path.join(__dirname);

module.exports = {
    mode:'development',
    entry:{
        vendor:['react','react-dom','redux'],
        App:path.resolve(__dirname,'src/client/App.js'),
        index:path.resolve(__dirname,'src/client/index.js')
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                use:'babel-loader',
                test:/\.js$/,
                exclude:/node_modules/
            },
            {
                test:/\.json$/,
                use:'json-loader'
            },
            {
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../'
                    }
                },
                    "css-loader"
                ]
            },
            {
                test:/\.(jpg|png)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:100000,
                        name:'images/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },

    devServer:{
        port:3000,
        hot:true,
        inline:true,
        contentBase:path.resolve(__dirname,'./dist'),
        proxy:{
            "/api":"http://localhost:8080"
        },
    },
    plugins:[
        new htmlWebpackPlugin({
            'template':'src/client/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name].[hash].css",
            chunkFilename:"[id].css"
        })
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendor: {
                    chunks:'initial',
                    name:'vendor',
                    test:'vendor',
                    enforce:true
                }
            }
        }
    }
};