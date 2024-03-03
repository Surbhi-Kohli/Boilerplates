
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

<img width="836" alt="Screenshot 2024-02-24 at 2 31 27 PM" src="https://github.com/Surbhi-Kohli/Boilerplates/assets/32058209/434f1940-e9c1-4ef4-b123-dda952789d74">

The index.html from dist loads as follows:

<img width="898" alt="Screenshot 2024-02-24 at 2 31 39 PM" src="https://github.com/Surbhi-Kohli/Boilerplates/assets/32058209/33a04054-4c8b-4840-b9c9-bb0336658ae3">


## Commit 7:
There are few problems in previous assets setup:
* We have hardcoded the path of assets folder in template.html.
* The setup relies on assets folder being a sibling folder to dist , for it to access the svg.
* The dist folder should have all the files that we need for build, including the assets.Here our assets folder is outside and dist is made to link to it is not ideal.

We need to have our assets folder added within dist on build, and add cache busting


We need HTML-Loader:

How does html-loader work?
The html-loader defination says that it exports html as String (What does it mean).

it also says that every loadable attributes (for example <img src="image.png" is imported as require('./image.png'),and you may need to specify loader for images in your configuration (file-loader or url-loader), What does it mean.

 Does it convert html into String or it just convert the img tag to require. How all this work together.

There are two underlying questions that I'm going to answer first.

Q. What type of asset webpack understands by default?

A. By default webpack only understands JavaScript.

Q. What should we do if we want to work with other types of assets (namely HTML, CSS, images, etc.)?

A. We must use loaders and plugins to expand webpack's functionality.

In other words, loaders and plugins allow us to work with static assets in webpack.

Q. What does it mean to export HTML as string?
A. You need to remember that HTML and JavaScript are two different things. If you want to manipulate the DOM using JavaScript, you do that through APIs, for example, when you write

const p = document.createElement("p");
document.body.appendChild(p);
You are using the Document Object to write to an HTML file. You can also do something like this:

```
const html = '
  <h1>heading level 1</h1>
';
const header = document.createElement("header");
header.innerHTML = html;

document.body.appendChild(header);
```
The string assigned to the html variable is what's called an HTML string. Simple put, a string that contains HTML markup.

This is part of what the html-loader do: it reads your HTML files and returns their contents as HTML strings that can be understand by JavaScript and used by APIs.

The html-loader also translates every loadable attribute to require() calls. Again, because JavaScript doesn't understand HTML related syntax such as src, href, etc., but it understands the require() syntax, which is Javascript related syntax.
I'm answering your questions in a different sequence for I believe this is a more logical sequence for understanding the usage of the html-loader.

There are two underlying questions that I'm going to answer first.

Q. What type of asset webpack understands by default?

A. By default webpack only understands JavaScript.

Q. What should we do if we want to work with other types of assets (namely HTML, CSS, images, etc.)?

A. We must use loaders and plugins to expand webpack's functionality.

In other words, loaders and plugins allow us to work with static assets in webpack.

Q. What does it mean to export HTML as string?

A. You need to remember that HTML and JavaScript are two different things. If you want to manipulate the DOM using JavaScript, you do that through APIs, for example, when you write

const p = document.createElement("p");
document.body.appendChild(p);
You are using the Document Object to write to an HTML file. You can also do something like this:

const html = `
  <h1>heading level 1</h1>
`;
const header = document.createElement("header");
header.innerHTML = html;

document.body.appendChild(header);
The string assigned to the html variable is what's called an HTML string. Simple put, a string that contains HTML markup.

This is part of what the html-loader do: it reads your HTML files and returns their contents as HTML strings that can be understand by JavaScript and used by APIs.

The html-loader also translates every loadable attribute to require() calls. Again, because JavaScript doesn't understand HTML related syntax such as src, href, etc., but it understands the require() syntax, which is JavaScript related syntax.


Q. What does it mean (that you may have to specify a loader for images in your configuration)?

A. If your .html file has an img inside it, the image will be required but, again, webpack only understands JavaScript by default. Therefore, you'll have to set up a loader for allowing webpack to process your image.

Q. How the html-loader works?

A. Simplifying, it will read the contents of you .html file and, if it finds loadable attributes on the elements, it will translate them into require() calls. The URL passed as an argument to the require() function can reference a simple address (when an href attribute is translated into a require() call, for instance) and, in this situation, you won't need to set up an additional loader; Or it can reference an image (when a src is translated into a require() call, for example) and, in this situation, since webpack don't understand images by default, you'll have to configure a loader (the file-loader).


Note: Since webpack 5, webpack uses Asset Modules(https://webpack.js.org/guides/asset-modules/) for loading images. Therefore, you don't need to set up additional loaders for handling images.

webpack-clean-plugin:
whenever we make changes in our files and build, we see a new main.js file being genrated.
With webpack-clean plugin, it will delete the dist directory every time we build and generate a new one.And then we will have a clean slate to add our code into.


What to do:
- Move the assets within src(so path in template needs to be changed).Webpack will take those assets, 
copy them over to dist into new folder and then link to them
- When we build,the dist want to be able to access assets folder. For that we need html-loader (https://github.com/webpack-contrib/html-loader)
Any time when html-loader encounters a src for an image, it will require the image .It will tell webpack ,that heres a file that
we need to load and then we will have to tell webpack on how to handle those files.
- In the common config, we will add rule that handles html file and for that ,we specify to use html-loader
ie, whenever a file ends with name .html, html-loader will take charge of it.
- The html loader will come across the src in img tag and require it in js.It will  add an svg file with hash name.and also correctly link the file in index.html of dist.
- For webpack version older than 5, we will need an appropriate loader for the svg file.Above step wont happen in that case.This is where file-loader comes in
It will help in loading svg,png or jpeg.For webpack 5+ : https://webpack.js.org/guides/asset-modules/
- Added the clean-webpack-plugin to prod config, to genrate a brand new dist on every build.
We dont need in dev , b'coz we use thedev server that generates files in memory temporarily


## Commit 8:Code Splitting
We need to work on way for webpack to spit out multiple bundles instead of one.We might want to separate our
own app code and our vendor code.Lets say we have jquery and bootstrap.Those are not gonna change much ,but our main code is gonna change.So we will have 2 different bundles, one of them being vendor.hash.bundle.js.Since the content of the vendor is not gonna change, the hash generated would always be same and hence the browser can cache those files.
- In our Config, we have added 2 entry points, one is main, while other is vendor and hence in the dist 2 js files will be generated.
main.hash.js will contain our app logic, while vendor.hash.js will contain the whole bootstrap, popper and jquery code.
- We have updated the output value to take name as input instead of it being hardcoded to main

Why we need this setup(Code splitting)
Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.Separating  common modules from bundles allows for those chunks to be loaded once initially and stored in the cache for later use.

Bootstrap needs popper and jquery, so we have installed those
-We have installed bootstrap, popper and jquery as dev dependencies since, We don't need them to be on our bundle. All our code is being transformed into a bundle that is self-sufficient.

-We had to import bootstrap css file's exact path in vendor.js for the bundle to contain complete code.

## Commit 9: Extract CSS & Minify HTML/CSS/JS

Right now, the css is loaded via javascript, where js contains the giant css string and injects the style tag to html file and adds the css.
You see that the script tags in html, load our main.js and vendor.js which have details about the styles.
In production, it is better to have a separate css file rather than waiting for js to inject it.
We wont prefer to have this separate css file in dev , because it takes time to spit out css files and is faster when u are just developing with the dev server, u dont want it to re compile and rebundle.
Also listing difference between style tag and link tag usage:
In HTML, there are two primary ways to include CSS (Cascading Style Sheets) in a document: using the <style> tag and using the tag.

<style> tag:
The <style> tag is used to define internal CSS within an HTML document. It's typically placed within the section of the HTML document. The CSS rules defined within the <style> tag apply only to the specific document in which they are defined. This method is useful for small, single-page applications or documents where the CSS is unique to that document.

tag:
The tag is used to link an external CSS file to an HTML document. It's placed within the section of the HTML document. The CSS rules defined in the linked external CSS file can be reused across multiple HTML documents. This method is preferred for larger projects with multiple HTML pages or when you want to separate the CSS code from the HTML for better organization and maintenance.

Performance Difference:
When it comes to performance, there's generally no significant difference between using the <style> tag and the tag to include CSS. However, there are a few factors to consider: Caching:

When you use the tag to link an external CSS file, the browser can cache the CSS file. Subsequent page loads will then be faster because the cached CSS file doesn't need to be re-downloaded. With the <style> tag, the CSS is included directly within the HTML document, so it cannot be cached separately. This means that the CSS is fetched every time the HTML document is loaded.

Page Load Time:

In some cases, using an external CSS file linked with the tag might lead to faster initial page load times because the browser can start fetching the CSS file while parsing the HTML document. However, for small projects or when the CSS code is minimal, the difference in page load time between using <style> and might not be noticeable.

Code Organization and Maintainability:

Using the tag with an external CSS file promotes better code organization and maintainability, especially for larger projects, as it separates the HTML and CSS code. The <style> tag is more suitable for small-scale projects or cases where the CSS code is specific to a single document. In summary, while there may be subtle differences in performance between using the <style> and tags, the choice between them often depends on factors such as code organization, maintainability, and project size rather than significant performance considerations.

- Once we get css in separate file via mini-css-extract-plugin ,we create a separate file via loader from this plugin.Then we want it to be minified in production.
- We will use optimize-css-assets-webpack-plugin.
- For that we add the optimization property.
-But after we add it, the js files in the dist are not minified.When u build the project, u will get warning that the asset size has exceeded the permissible limit , since our files are not minified.
- In prod mode, optimization minimizer is by default set to a javascript minifier.But then we overwrite it  by telling it to use the optimize-css-assets-webpack-plugin to minimize our css files.So we fix it by manually specifing to use  TerserPlugin for js minimization.So we have to manually add that back, although we dont need to install it , since it gets installed while installing webpack.
-To minify html, u can use the existing html webpack plugin.But this plugin is by default in minify to true in production mode.It internally uses html-minifier-terser .You can set additional minification capabilities like removing comments, extra lines, double quotes,etc.