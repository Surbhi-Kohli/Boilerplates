
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


## Commit 5:
- Broke our webpack.config file into 3 files
- webpack.config.js, webpack.development.js, and webpack.production.js
- installed webpack-merge to share the common functionality
- installed webpack-dev-server and added it to start script in package.json, so that we dont have to run ``yarn dev``
everytime we do a change.

## Commit 6:
- Added assets folder with an svg image
- The template file references the svg image
- The index.html in dist, that gets build, is also able to reference the same assets folder and the svg .
![Alt text](https://file%252B.vscode-resource.vscode-cdn.net/Users/s0k06tn/Documents/Screenshot%25202024-02-24%2520at%25202.31.27%2520PM.png?version%253D1708765374344)

The index.html from dist loads as follows:
![Alt text](https://file%252B.vscode-resource.vscode-cdn.net/Users/s0k06tn/Documents/Screenshot%25202024-02-24%2520at%25202.31.39%2520PM.png?version%253D1708765338209)


