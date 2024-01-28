const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    // devtool:"none",//to remove eval from the minified code
    mode: "development",
    entry:"./src/index.js",
    output:{
     filename:"main.[contenthash].js",
     path:path.resolve(__dirname,"dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template:"./src/template.html"
    })],
    module:{
        rules:[
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
            }
        ]
    }
   
}