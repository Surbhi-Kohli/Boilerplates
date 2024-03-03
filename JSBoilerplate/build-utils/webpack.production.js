const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const  MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = () => ({
    output: {
      filename: "[name].[contenthash].bundle.js"
    },
    module:{
      rules:[
        { test:/\.css$/,
           use:[MiniCssExtractPlugin.loader,//extract css into separate files
          "css-loader"]
      }
    ]
    },
    optimization:{
      minimizer:[
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin()
      ]
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:"./src/template.html",
        // minify:{
        //   removeAttributeQuotes:true,
        //   collapseWhitespace:true,
        //   removeComments:true
        // }
    }),
      new MiniCssExtractPlugin({filename:"[name].[contenthash].css"}),//specify the file name of css file
      new CleanWebpackPlugin()
    ]
  });
  