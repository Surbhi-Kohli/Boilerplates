var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = () => ({
    module:{
        rules:[
            { test:/\.css$/,
            use:["style-loader","css-loader"]
          }
        ]
    },
    plugins:[new HtmlWebpackPlugin({
        template:"./src/template.html",
    }),]
});
