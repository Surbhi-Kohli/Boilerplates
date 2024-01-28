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
    }
  });
  