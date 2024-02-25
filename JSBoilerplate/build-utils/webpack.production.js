const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = () => ({
    output: {
      filename: "[name].[contenthash].bundle.js"
    },
    module:{
      rules:[
        { test:/\.css$/,
        use:["style-loader","css-loader"]
      }
    ]
    },
    plugins:[
      new CleanWebpackPlugin()
    ]
  });
  