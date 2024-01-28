
## Commit 1:
- Installed webpack and webpack-cli
- Added a start script in package.json which calls webpack
- Made an index.js file, which is the file webpack looks for by default
- Webpack spits out our code in dist/main.js by default
- Currently our main app code has nothing to do with webpack, but it will soon.
- By default , the mode is production

## Commit 2:
- Created webpack.config.js
- Added some basic configuration
- Modified package.json, so that webpack uses our config file

## Commit 3:
Add first loaders to handle css
- Installed style-loader and css-loader
- Configured webpack.config to use both loaders on css files
- Remember the order we use them in webpack.config matters

## Commit 4:
Cache busting and HtmlWebpackPlugin
- Configured webpack to use contentHash in bundle file name
- This caused a problem with our script tag in index.html.How are we going to dynamically add the new file in the index.html file
- We installed HtmlWebpackPlugin to help us generate a new index.html and put it in dist folder, with the correct script file automatically added
- HtmlWebpack plugin creates HTMl files to serve your bundles
- It automatically includes the correct script tag in the head tag by default.
 The script still loads only after the HTML has been parsed, since the script tag has the defer attribute, so there should not be any problem with it. But if you  want the script tag to be added at the end of the body, you can use the inject option. Please refer to the https://github.com/jantimon/html-webpack-plugin#options for more details.

```
module.exports = {
    mode: 'development',
    entry: './src/scripts/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',//adding a template
            inject: 'body'
        })
    ]
}

```


- We created a template file that we passed in called template.html
- We deleted the original index.html because we don't need it anymore
- Make sure you are opening dist/index.html now to view the app
