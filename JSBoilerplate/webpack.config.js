const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
module.exports=({ mode, presets } = { mode: "production", presets: [] }) => {

  return merge({
    // devtool:"none",//to remove eval from the minified code
        mode,
        entry:{
          main:"./src/index.js",//msin= name that is read by output config
          vendor:"./src/vendor.js"//vendor = name
        },
      
        module:{
          rules:[
              { test:/\.html$/,
              use:["html-loader"]
            },/**
            {//for webpack version less than 5
              test:/\.(svg|png|jpeg|gif)$/,  //$ represents end
              use:{
                loader:"file-loader",
                options:{
                  name:"[name].[hash].[ext]",//move the file to dist folder and name like so
                  outputPaths:"imgs"//webpack will create this new folder
                }
              }
            }
            */
          ]
      },
        output:{
          filename:"[name].[contenthash].bundle.js",
          path:path.resolve(__dirname,"dist")
        },
        plugins: [
        new CleanWebpackPlugin()
      ]
},
modeConfig(mode)
);
}