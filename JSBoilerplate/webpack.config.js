const path = require('path')
module.exports={
    // devtool:"none",//to remove eval from the minified code
    mode: "development",
    entry:"./src/index.js",
    output:{
     filename:"main.js",
     path:path.resolve(__dirname,"dist")
    }
}