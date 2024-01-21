
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