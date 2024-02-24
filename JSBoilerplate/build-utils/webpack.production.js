const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = () => ({
    output: {
      filename: "main.[contenthash].js"
    },
    module:{
      rules:[
        { test:/\.css$/,
        use:["style-loader","css-loader"]
      }
    ]
    },
    plugin:[
      new CleanWebpackPlugin()
    ]
  });
  