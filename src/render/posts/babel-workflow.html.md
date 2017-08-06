---
author: 'ruairi'
title: 'Babel Workflow'
cover: '/img/heads/small-fresh.jpg'
isPost: true
active: true
excerptOther: 'Babel Workflow for ECMAScript 2015.'
postDate: '2016-02-28'
date: '2016-02-28'
tags:
 - es6
 - ECMAScript 2015
 - babel
---

I have decided to go full on ECMAScript 2015 aka ES6 (I'll call is ES2015). Here's the method I used to begin coding in it.

Before I go any further, all the source for this post is here https://github.com/ruairitobrien/babel-workflow-example so it's up to you if you want to just pull that down and see how it works or follow along here.

The down side to going full on ES2015 is the fact that not all browsers support it fully yet and some never will. Check out the [ES6 compatibility table](https://kangax.github.io/compat-table/es6/). It's hard to write an app that's supported absolutely everywhere and there's a lot to be said for keeping it simple, like [this site](http://motherfuckingwebsite.com/) but if you want to write any reasonably complex app in JavaScript today, ES2015 [transpiling](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/) to ES5 is probably the nicest way to go about it.

So one good option for transpiling your ES2015 code to ES5 code is to use [Babel](https://babeljs.io). Not only does it have a cool name, Babel does a good job at keeping the converted code pretty neat and understandable. Another nice thing is that if you want to use React and JSX, Babel supports that too.

This post is purely about allowing you to write ES6 code. I won't go in to the various other things you might want to do like minification.

To follow along you must install nodeJs. Once that's installed use npm to install gulp globally.

```bash
npm i -g gulp
```

Here are some things I tend to do when starting a new project. You may notice these commands are all in bash syntax. If you're a Windows user and have git installed, you can use git bash to follow along if you like or just do the windows equivalent.

I'll create a directory and initialize both a git repository and a node project.

```bash
mkdir babel-workflow-example && cd $_
git init
npm init
```

`npm init` will ask you a few questions. Select the defaults by hitting enter all the way or else answer the questions as you like.

Create a gulpfile and install gulp and gulp-babel and the es2015 preset transformation for babel. The instructions here are taken straight from [the Babel site](https://babeljs.io/docs/setup/#gulp).

```bash
touch gulpfile.js
npm i --save-dev gulp gulp-babel babel-preset-es2015
```

Write the .babelrc file.

```bash
echo '{ "presets": ["es2015"] }' > .babelrc
```

<h3>Structure</h3>

Before we write our gulpfile let's decide on a little bit of a project structure. I'll follow this simple convention.

* client/js/ - the directory that will hold all our client side ES2015 source code.
* public/js/ - the location that our transpiled JavaScript code will go to.
* public/index.html - the main html file that our scripts will get loaded in to.

The convention doesn't really matter. You can put this stuff wherever you want. If you choose a different structure you just need to update the paths that will be specified in the gulp file. I chose the convention I am using as it's simple for preprocessing and easy to add server side code to the project later.

We will write our code in the 'client/js' directory, have gulp watch those files and have Babel transform the files, outputting the ES5 code to the 'public/js' directory. For ES2015 module support we will use [browserify](http://browserify.org/). There are other options such as [webpack](https://webpack.github.io/). Browserify and webpack are both very popular and it's worth learning about both so you can pick what fits your needs best. I am choosing browserify here because it works well with gulp and with the default [commonjs](http://www.commonjs.org/) module system that babel uses so is one of the options with the least amount of setup required.

<h3>Gulping</h3>

OK, so let's get something working. We'll create some simple ES2015 code that outputs something to the console.

I'll just call the first file main.js:

```bash
mkdir -p client/js && touch client/js/main.js
```
Stick this in your gulpfile.js (note we'll be changing this file a fair bit over the course of things)

```javascript
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('client/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/js'));
});
```

The <a href="https://en.wikipedia.org/wiki/Glob_(programming)" target="_blank">glob</a> pattern I'm using here `client/js/**/*.js` just says to process any files under client/js with a .js extension. It will also work on subdirectories there.

Now we'll put together some ES2015 code. I'm very new to ES2015 still so nothing too fancy. I'll just throw in some bits of the new language for demo purposes.

```javascript
class ForWantOfANail {
    constructor() {
        this.wants = new Map();
        let w = this.wants;
        w.set('nail', 'shoe');
        w.set('shoe', 'horse');
        w.set('horse', 'knight');
        w.set('knight', 'battle');
        w.set('battle', 'kingdom');
    }

    toString() {
        var forWantOfANailString = '';
        for (var [key, value] of this.wants) {
            forWantOfANailString += `For want of a ${key} the ${value} was lost,\n`;            
        }
        forWantOfANailString += 'So a kingdom was lost—all for want of a nail.'

        return forWantOfANailString;
    }

    toHtmlString() {
        var lineBreak = '<br>';
        var htmlString = '';
        for (var [key, value] of this.wants) {
            htmlString += `For want of a ${key} the ${value} was lost,${lineBreak}`;            
        }
        return htmlString += 'So a kingdom was lost, all for want of a nail.';
    }
}

const nail = new ForWantOfANail();

console.log(nail.toString());
```

Pretty basic stuff but there's enough ES2015 to demonstrate what we need. It will print out an old proverb in the console when run. It also provides a method to get a HTML string of the proverb. This JavaScript, as it is, will not work in most browsers but is valid ES2015.

Now you can try running `gulp` and, all going well, you will see a new file appear at `public/js/main.js`.

You can test it out with node. Run this command.

```bash
node public/js/main.js
```

You should see this.

```
For want of a nail the shoe was lost,
For want of a shoe the horse was lost,
For want of a horse the knight was lost,
For want of a knight the battle was lost,
For want of a battle the kingdom was lost,
So a kingdom was lost, all for want of a nail.
```

<h3>In a Browser</h3>

Printing to the console is fine. The more recent versions of node already supports much of ES2015 and doesn't even need Babel for this. Now we'll look at a good workflow for using ES2015, with Babel, for frontend development.

Create our main HTML file and import our main script to it.

```bash
touch public/index.html
```

Put this HTML in it.

```html
<html>
<head>
    <meta charset="UTF-8">
    <title>Doing a bit of Babel</title>
</head>
<body>
    <div id="output"></div>
    <script src="js/main.js"></script>    
</body>
</html>
```

Add this to the end of the main.js files:

```javascript
document.getElementById('output').innerHTML = nail.toHtmlString();
```

You could open the index.html file up directly in a browser but that's no good really. What we want is to have the file served up on localhost. There are a great many ways to accomplish this but if all you want to do is get coding quickly, try out [browsersync](https://www.browsersync.io/). It will serve up a directory of your choice for you and any time you make a change, you can have the browser automatically refresh. If you've used all this before, great, you understand the benefits. If you haven't then you will probably lament all that time you waisted refreshing the browser before. I really dislike working on a (browser based) codebase that doesn't use use something like browsersync or livereload. I even use browsersync for electron based apps.

To set this up is really simple. Looking at the doc [here](https://www.browsersync.io/docs/gulp/), all we have to do is install:

```bash
npm i --save-dev browser-sync
```

Modify the gulpfile to use it:

```javascript
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

gulp.task('build', function () {
    return gulp.src('client/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest("public/js"));
});

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task('default', ['serve']);

```

We're just gong to use the browserSync static server.

If you have your own server already, such as an express app for example, you can proxy that through browserSync instead. So if your app starts up on http://localhost:3000, change the browserSync.init call to this:

```javascript
browserSync.init({
        proxy: 'http://localhost:3000'
    });
```

So, anyway, now if you run `gulp`, all going well a browser window should open and you should see the old proverb printed on the page.

We nearly have a good workflow now. We can write ES2015 code, run gulp and have the browser open with running our transpiled code.

There's a few more really important bits left to do though. Ideally we would write code, even add files and have everything running in the browser immediately with no updating of the html file to reference new scripts and and no need to start and stop the gulp process. Achieving that is pretty simple too. Here's how.

<h3>Automating Your Troubles Away</h3>

Let's put a watch on our ES2015 code. I'll show the entire gulpfile once we're done but I'll explain what we're adding a little first. In the gulp serve task, we will add a watch on all JavaScript files under `client/js` so that any time we make a change the code will automatically get transpiled.

```javascript
gulp.watch('client/js/**/*.js', ['build']);
```

Then add a watch to the public directory so that any changes will automatically reload the browser.

```javascript
gulp.watch('public/**').on('change', browserSync.reload)    
```

After a JavaScript build happens, the watch on the public directory will kick in since the build will have updated the public JavaScript file. As your project grows you may want to look at more efficient ways to watch files but the above method is perfectly fine in most simple cases and I wouldn't worry about it unless performance actually becomes an issue. You might also want to look at [watchify](https://github.com/substack/watchify) but there was no need for an extra library here.

<h3>Modules</h3>

Finally we will take a quick look at modules. Originally I had planned on using something like [gulp-wiredep](https://www.npmjs.com/package/wiredep) and [gulp-inject](https://www.npmjs.com/package/gulp-inject) as a nice way to deal with adding more JavaScript files and not having to worry about adding those pesky script tags to your HTML. They are great for that and I highly recommend you take a look at them but it occurred to me that there's a better way now with ES2015 to manage this and it's called modules. Well, in this case it's the plugin we will use to implement modules. As I mentioned earlier, we are going to use [browserify](http://browserify.org/) here. The result of using modules with this plugin is similar to what you might do when pre-processing JavaScript for production by concatenating all your JavaScript files except better in many ways which hopefully will be evident once you see how it works.

So we add a new file:

```bash
touch client/js/forWantOfANail.js
```

Cut the ForWantOfANail class from client/js/main.js and paste it in to the new file.
Then export the class so client/js/forWantOfANail.js should look like this:

```javascript
export class ForWantOfANail {
    constructor() {
        this.wants = new Map();
        let w = this.wants;
        w.set('nail', 'shoe');
        w.set('shoe', 'horse');
        w.set('horse', 'knight');
        w.set('knight', 'battle');
        w.set('battle', 'kingdom');
    }

    toString() {
        var forWantOfANailString = '';
        for (var [key, value] of this.wants) {
            forWantOfANailString += `For want of a ${key} the ${value} was lost,\n`;            
        }
        forWantOfANailString += 'So a kingdom was lost—all for want of a nail.'

        return forWantOfANailString;
    }

    toHtmlString() {
        var lineBreak = '<br>';
        var htmlString = '';
        for (var [key, value] of this.wants) {
            htmlString += `For want of a ${key} the ${value} was lost,${lineBreak}`;            
        }
        return htmlString += 'So a kingdom was lost, all for want of a nail.';
    }
}
```

And your client/js/main.js should look like this:

```javascript
import {ForWantOfANail} from './forWantOfANail.js';

const nail = new ForWantOfANail();

console.log(nail.toString());

// If running in a browser, print the profound proverb to the output element
if (typeof document !== 'undefined')
    document.getElementById('output').innerHTML = nail.toHtmlString()
```

Note the import statement at the top and the fact that the file reference is relative to main.js.

Now if you run

```bash
gulp build && node public/js/main.js
```

you should see something like this:

```
[23:39:55] Starting 'build'...
[23:39:56] Finished 'build' after 336 ms
For want of a nail the shoe was lost,
For want of a shoe the horse was lost,
For want of a horse the knight was lost,
For want of a knight the battle was lost,
For want of a battle the kingdom was lost,
So a kingdom was lost, all for want of a nail.
```

Pretty cool but if you just run `gulp` you'll be presented with a blank page in the browser. The reason for that is the browser doesn't know about your modules. To be more precise, it doesn't know about the file public/js/forWantOfANail.js.

The default module loader specification that babel used is CommonJS. Same `require` syntax as node if you're familiar with that.

So at this point we need to modify the gulpfile a bit to bundle our module files and install a few dependencies and then we're done. Here's a command to quickly install all that you need:

```bash
npm i babelify browserify gulp-sourcemaps vinyl-source-stream vinyl-buffer --save-dev
```

If you were following along before and installed `gulp-babel`, you can remove it now if you wish `npm uninstall gulp-babel -D`

Babelify is there to help us use babel and browserify together easily.

gulp-sourcemaps is to help us build sourcemaps which we kind of need now since we're bundling everything in to one file.

[vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream) is about converting streams for gulp. This [SO answer](http://stackoverflow.com/questions/30794356/why-do-i-have-to-use-vinyl-source-stream-with-gulp) is good if you want more info on that.

[vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer) is another tool along those lines for simplifying stream usage. Checkout their npm page for more on that.

And finally we can change our gulpfile to look like this:

```javascript
var path = require('path');
var gulp = require('gulp');
var babelify = require('babelify')
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();


/**
 * Most values specific to this particular project is contained here.
 */
var gulpOptions = {
    jsMain: 'main.js',
    jsSourceDir: __dirname + '/client/js',
    jsOutDir: __dirname + '/public/js',
    server: {
        baseDir: './public'
    }
}

/**
 * Get a bundler that will use browserify to process modules and babel to transpile ES6 code.
 *
 * @param source the entry point script to be bundled
 */
function getBuilder(source) {
    return browserify(source, { debug: true }).transform(babelify);
}

/**
 * Pre-process and bundle up all the front end stuff
 *
 * @param builder - the configured bundler to use for building
 * @param options - configuration options for building frontend assets
 */
function build(builder, options) {
    return builder.bundle()
        .pipe(source(options.jsMain))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(options.jsOutDir));
}

/**
 * Serve up the front end which in this case just initializes browser sync
 *
 * @param options - configuration options for serving up web assets
 */
function serve(options) {
    return browserSync.init(options);
}

gulp.task('build', function () {
    var builder = getBuilder(path.join(gulpOptions.jsSourceDir, gulpOptions.jsMain));
    return build(builder, gulpOptions);
});

gulp.task('serve', ['build'], function () {
    return serve(gulpOptions);
});

gulp.task('serve-watch', ['build'], function () {
    serve(gulpOptions);
    gulp.watch('client/js/**/*.js', ['build']);
    gulp.watch('public/**').on('change', browserSync.reload)
});

gulp.task('default', ['serve-watch']);
```

The gulpfile has gotten a little more complicated but hopefully it all makes sense to you.

The build function is the main thing there. It uses babelify & browserify to bundle the ES2015 code in to a single ES5 script file. It resolves what files need to be bundled by processing the import statements in your code. Any file that isn't referenced will not end up in the output. It pipes the outputs through the sourcemap builder and then writes everything to the public/js directory. 'Everything' being a single main.js file and a corresponding main.js.map file that your browser can use to make debugging easier when developing. The sourcemaps processor we're using takes care of the map referencing by adding this comment to the end of the main.js: `//# sourceMappingURL=main.js.map`.

More on sourcemaps [here](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) and [here](https://github.com/ryanseddon/source-map/wiki/Source-maps%3A-languages,-tools-and-other-info).

The `gulp serve` task will build and serve everything and then exit the gulp process.

If you just run `gulp` you can see that the `serve-watch` task is called that will build and serve but also watch all the specified files for changes. The gulp task will not exit in that case until you tell it to.

Using the watch task you can develop with very quick feedback and minimum distraction. All assets will build automatically and the browser will automatically refresh on every change. You will probably want to add a test runner in there and have your tests run on every change too. That is easy to accomplish with the methods outlined in the gulpfile above. For example you might do

```javascript
gulp.watch('client/js/**/*.js', ['test']);
```

Hope you found this useful and if like me you were hesitant to begin using ES2015, I hope this will help you begin that journey. Good luck and thanks for reading.
