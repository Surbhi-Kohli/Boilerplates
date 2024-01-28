const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
module.exports=({ mode, presets } = { mode: "production", presets: [] }) => {

  return merge({
    // devtool:"none",//to remove eval from the minified code
        mode,
        entry:"./src/index.js",
        output:{
          filename:"main.[contenthash].js",
          path:path.resolve(__dirname,"dist")
        },
        plugins: [new HtmlWebpackPlugin({
            template:"./src/template.html"
        })]
},
modeConfig(mode)
);
}