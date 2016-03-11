---
title: "To Make a Blog"
cover: '/img/to-make-a-blog.jpg'
isPost: true
active: true
excerptOther: 'In the beginning.'
postDate: 'Sun Feb 2 2016 GMT'
tags:
 - first post
 - blog
 - docpad
 - staticgen
---

I decided to make a blog.

I work as a programmer and I guess my main hobby is programming too so my decision to make a blog brought with it a lot of over thinking about how to build the blog and surprisingly little about what would be blogged.

Should I sign up to a service like [Wordpress](https://wordpress.com/), [Blogger](https://www.blogger.com/home) or [Medium](https://medium.com/)? They're all nice and quick to get started. For a person who enjoys technology and works in the software industry, a place on the internet to call your own makes a lot of sense. The more control you have over it the better. None of the existing services provide a place to call your own in my view. Just like social media, you will create all the content but you must fit their format and are just part of the tapestry of their site.

If the existing services aren't the right option, what are the alternatives?

Build your own site of course! One problem there is, that's a lot of work. Sure you could throw something together fairly quickly but watch the hours slip away as you try to add some of the common features on any blog site. We (developers) all know we **can** build a blog site from scratch. In the majority of cases, we really shouldn't.

One option. Set up a [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle) server, install Wordpress... I really don't want to launch in to a long spiel about why I don't like this option but, well, I don't. I don't like managing a database if I don't have to. I like things to be fast and scalable and I don't like dealing with security issues if I don't have to. If you have coding skills, take advantage of them and avoid Wordpress. That is just my opinion though. A lot of people wouldn't agree with me on that I know.

<h3>Static Site Generators</h3>

While over thinking all this and doing anything but actually starting my blog, I stumbled across static site generators. A novel concept to me. I did recognize names like Jekyll and Hexo but never really looked in to them before.

A static site generator is what I went for in the end to build this blog. Here is a list of reasons why and these are true for the majority of static site generators you may come across, either out of the box or through plugins.

* No database
* Everything in source control
* Markdown
* Full control

<h4>No Database</h4>

You really don't need one to get a standard blog going. What would you want it for? Posts and Comments? Posts can be generated and stored in source control. Comments can be done using a third party tool like [Disqus](https://disqus.com/). I'll go in to those two facts in detail later but let me just touch on why you're actually better off without a database.

A database is an extra bit of complexity in your life. If you've set up something like Wordpress, you're stuck with a database. If you're lucky and traffic builds up you may need to figure out how to scale that database. You need to back it up, optimize it etc. etc. It can be slow. Unless you've built some nice caching (OK maybe there's some easy plugins for that in Wordpress, I don't know), every time a user visits your blog, the database will be queried for almost everything the user sees every time they visit a page. Even if that stuff hasn't changed for ages.

Databases are great of course but in my experience you should only use one if you absolutely need one. I watched a [great talk](https://www.youtube.com/watch?v=asLUTiJJqdE) by Uncle Bob Martin on architecture where he talked about how the team working on [Fitnesse](http://www.fitnesse.org/) got really hung up on the database design at the beginning of the project. Before they ever wrote code or played around with a prototype, the database was a primary concern. They decided to use a basic file storage method in the beginning so they could defer major decisions on the database and get some something done. In the end they discovered they didn't actually need a database at all. They made databases a plugin option.

<h4>Everything in Source Control</h4>

I just love [Git](https://git-scm.com/). I never even once thought Github and Git were the same thing! I'm an old school Git lover. Using a static site generator, adding content to your site is just adding commits to source control. If you have things set up nicely, commit to master and your new blog post is published. You've got a full history. Git is distributed so you would be very unlucky to lose all your content. What's not to love? Unless you don't like Git. That would be..... unfortunate.

<h4>Markdown</h4>

Markdown is grand. Simple and fast. If you've written lots of README files for your Github projects then you know all you need to know about that. It's faster than writing plain HTML. If you know it by heart, it's faster than using a complex editor with a lot of buttons to learn. In the end it becomes HTML so you have full control over how it will look.

<h4>Full Control</h4>

You really do have full control. With very little learning involved, it's very easy get started with these generators. You could write all this stuff in JavaScript and HTML but the generators automate a lot of it while still leaving you full control over how everything looks, where it goes and what's generated. There's no magic and unless you've picked a very bad tool, there's not much restrictions. Just take a little time to learn more about the tool you choose and it will pay off.

<h2>The Stack</h2>

I played around a little with [Jekyll](https://github.com/jekyll/jekyll) and a [few others](http://staticgen.com/) but in the end I settled on [Docpad](http://docpad.org/). It's an excellent tool and I do encourage you to look at their site. I will go through what I needed to do to get it going here.

For source control I use Git and for hosting, at the time of writing, I am using [Github pages](https://pages.github.com/). Because the site will only have static content, I don't need to worry much about hosting. Github pages is a nice free option.

Beyond that, all that's needed are a few docpad plugins and everything is set.


<h2>Build a Blog</h2>

If you want to use the same method I have to build a blog and follow along here, you will need to install [Node.js](https://nodejs.org/) if you don't have it already.

Once installed, you can now install docpad on the command line.

<h3>Install Docpad</h3>

```bash
npm i -g docpad
```

On their site instructions they show this as the way to install:

```bash
npm install -g npm
npm install -g docpad@6.78
```

 The number may have changed by the time you read this. I really don't know why they suggest a specific number though. Just
 ```bash
 npm i -g docpad
 ```
should be fine.

 <h4>Scaffold the Site</h4>

 Create a new directory for your amazing new site. `cd` in to it and run `docpad run`.

 You will get a bunch of output. Here's the beginning of mine:

```bash
info: Welcome to DocPad v6.78.4 (global installation: /Users/ruairiobrien/.nvm/v4.2.1/lib/node_modules/docpad)
notice: Please donate to DocPad or have your company sponsor it: http://docpad.org/donate
info: Contribute: http://docpad.org/docs/contribute
info: Plugins:
info: Environment: development
info: Updating the exchange...
This can take a moment...
info: Updated the exchange
info: You are about to create your new project inside your current directory. Below is a list of skeletons to bootstrap your new project:
```

This is followed by a list of supported skeletons. You can work without a starting skeleton (see option 21 below)). I did give it a go. I was able to get a simple site up and running but I had to resign to the fact that I'm not a very good designer and I would learn more from a template to modify first.

Here's the list I was shown:

```bash
Which skeleton will you use? [1-21]
  1.	HTML5 Boilerplate (Supported)
  2.	Casper (Supported)
  3.	Twitter Bootstrap (Supported)
  4.	Twitter Bootstrap with Jade (Supported)
  5.	Bevry's Website (Supported)
  6.	Benjamin Lupton's Website (Supported)
  7.	DocPad's Website (Supported)
  8.	Bevry's Learning Centre (Supported)
  9.	Startup Hostel's Website (Supported)
  10.	Static Site Generators's Website (Supported)
  11.	HTML5 Boilerplate with Jade and LESS (Unsupported)
  12.	SlidePad (Unsupported)
  13.	Slides (Unsupported)
  14.	Reveal.js (Unsupported)
  15.	Meny (Unsupported)
  16.	Conference Boilerplate (Unsupported)
  17.	YUI PureCSS (Unsupported)
  18.	Zurb Foundation (Unsupported)
  19.	Zurb Foundation (Unsupported)
  20.	Casteasoft Foundation Simple Blog (Unsupported)
  21.	No Skeleton
```

I went with number 2, Casper. It gives you a very nice looking theme. Similar to medium or, I believe a direct copy of what the guys at [Ghost](https://ghost.org/) provide.

So, to pick the casper theme, key the number 2 and hit enter. It will take a bit of time but the operation should eventually complete and you should have a skeleton app created.

You'll see this in the output too which shows what plugins were installed:

```bash
info: Plugins: eco, marked, paged, partials, rss, tags
info: Environment: development
info: Server started on http://0.0.0.0:9778
```

Now you can navigate to the skeleton site at http://127.0.0.1:9778. It already looks pretty good right?

This gives you a lot of code that doesn't come with the 'no skeleton' option. For the purpose of a blog, this is a good thing I think. Even if you don't like the theme, I'd be inclined to suggest using it anyway and modifying what you need unless you're very comfortable with docpad already or you really want to start from scratch and have your own specific ideas of how it all should hand together.

Picking the Casper theme creates a project with these plugins and dependencies pre-installed:

* docpad-plugin-eco - for CoffeeScript templates
* docpad-plugin-marked - marked down to html
* docpad-plugin-paged - to support paging
* docpad-plugin-partials - to support partials
* docpad-plugin-rss - to support an rss feed (probably don't really need that)
* docpad-plugin-tags - to support tagging
* moment - date time formatting

If you went with the 'no skeleton' option you will likely want to add all these anyway.

```bash
npm i moment --save
docpad install eco marked paged partials rss tags
```

A quick note on `docpad install`.
It's a handy way to install plugins but you can do so without it by simply using npm install for the plugin and updating the docpad config (more on the docpad config later).

If you need to remove a plugin you use `docpad uninstall the-plugin-name` so if you wanted to uninstall the rss plugin for example it's:

```bash
docpad uninstall rss
```

<h3>More Plugins</h3>

Before you go crazy creating actual valuable content, let's procrastinate a little further and install a few more plugins. We'll just brush over what they are here and install them. We will go in to more detail about configuring them later.

**URLs:**

In a normal web app that you might build yourself, you'd probably have routes set up for your view with nice URLs. For example: http://yourblog/2016/01/great-post
Because we have a static site now we have kind of crappy looking URLs. If you started things up on http://127.0.0.1:9778 you might notice the likes of http://127.0.0.1:9778/posts/hello-post.html. My eyes! The humanity! What year is this?

Luckily there's a couple of plugins that will sort all that out for us. How these plugins work is kind of interesting and while I could go on about it and probably randomly will, I'd suggest a glance at the doc [here](https://github.com/docpad/docpad-plugin-cleanurls) if you're interested. We will need to configure these in a bit but for now, while running things locally, just installing them will do, so run this command:

```bash
docpad install cleanurls dateurls
```

**LiveReload:**

Manually refreshing the browser when you make a change is so old school.

```bash
docpad install livereload
```

Now when you make a change the brower will refresh automatically.

Or if you prefer, use browsersync. I personally think browsersync is a bit faster and tend to use it over livereload. Note though that by default you will need to access the site on http://localhost:3000 when using browsersync. You can add JSON to your plugin config to use all the standard browsersync configuration options too.

Want more plugin goodness. Check them out [here](http://docpad.org/docs/plugins)


<h3>Configuration</h3>

Creating content is so close now we can almost taste it.

Configuration is the last time consuming bit. This is where we dump out all the old boilerplate stuff we don't need for the generated site, configure how it all works and maybe even throw in a 'Hello World' post.

Lets have a quick look at the existing folder structure that came with the Casper theme. If you run a find command (exclude 'out', '.git' and 'node_modules') you should see something like this:

```bash
./.gitignore
./docpad.coffee
./LICENSE
./package.json
./README.md
./src/layouts/default.html.eco
./src/layouts/page.html.eco
./src/layouts/post.html.eco
./src/layouts/tag.html.eco
./src/partials/article-pager.html.eco
./src/partials/author.html.eco
./src/partials/loop.html.eco
./src/partials/masthead.html.eco
./src/partials/navigation.html.eco
./src/partials/pagination.html.eco
./src/partials/tags.html.eco
./src/render/about.html.md
./src/render/index.html.eco
./src/render/posts/hello-post.html.md
./src/render/posts/looking-glass-house.html.md.eco
./src/render/posts/style-test.html.md
./src/static/css/screen.css
./src/static/fonts/casper-icons.eot
./src/static/fonts/casper-icons.svg
./src/static/fonts/casper-icons.ttf
./src/static/fonts/casper-icons.woff
./src/static/img/bear-masthead.jpg
./src/static/img/carroll-cover.jpg
./src/static/img/cover.jpg
./src/static/img/hello-2-masthead.jpg
./src/static/img/hello-masthead.jpg
./src/static/img/logo.png
./src/static/img/testimg1.jpeg
./src/static/img/testimg2.jpg
./src/static/js/index.js
./src/static/js/jquery.fitvids.js
```

The template gives you a bunch of sample images. Remove the images if you like.

```bash
rm -rf ./src/static/img/*
```

If you do delete the images, the site will suddenly look very boring. Finding replacement images may be the hardest thing you ever do. Just a warning. Also you'll need to update any images links in the template files you keep.

All our blog post will be in src/render/posts. I'd recommend emptying that folder now.

```bash
rm -rf ./src/render/posts/*
```

You may have noticed a mix of .md and .md.eco files in there before. Docpad allows you to write markdown and have it converted to HTML. The .eco files in there are examples of a slightly more complex use case with pages that wouldn't be easily done in just markdown.

.eco files are files that use a CoffeeScript templating language. See [the project page](https://github.com/sstephenson/eco) for more on that.

Ultimately all these files are processed and put in the 'out' directory. If you've had an out directory created already and you end up removing some files, I've found I had to delete the whole out directory since file processing doesn't appear to remove files that were removed from the src folder. That is, deleting a post from src for example, doesn't appear to delete it from the generated output so just deleting the out directory is a quick way to be sure you're in sync.

You'll likely want to keep everything that's in the layouts folder although you may want to change them a bit. They're straight forward to understand if you give them a quick read.

I must admit, while I've been tempted a few times, I never took the time to learn CoffeeScript. It looks fairly straight forward and I probably could have hacked away and figured it out but I just don't plan on learning CoffeeScript. Particularly with ES6 around now. I really do like JavaScript so I decided to rename docpad.coffee to docpad.js and I ran the contents through a converter. http://js2.coffee/ did the trick for me. If you like CoffeeScript, great! Leave it as is.

docpad.js (or docpad.coffee if that's what you stuck with) is your main configuration file.

You will see the configuration object created `docpadConfig`. I'll briefly run through its properties here.

`docpadConfig.templateData`

This is all the stuff that will get injected in to your site. I think most of it is fairly obvious. I decided to trim down the navigation property to this:

```javascript
navigation: [
    {
        name: 'Home',
        href: '/',
        section: 'home'
    }, {
        name: 'About',
        href: '/about.html',
        section: 'about'
    }
]
```

The rest of the templateData object is some data and helpers for formatting dates, text, helping with navigation and other useful stuff. You don't get these in the 'no skeleton' version so even if all you used from the Casper theme was the configuration in docpad.js, you'd be saving a bit of time.

Fill in any values you like and we will move on.

`docpadConfig.collections`

For the purposes of a blog, the default collection here is perfect. It goes in to src/render/posts, gets all our posts (our markdown files) as a collection, specifies the layout src/layout/post.html.eco. These get converted to nice HTML files for us in the out directory. The collection can query using the YAML at the start of a post (more on that soon) and the collection can be used in our template code. For example in src/partials/loop.html.eco you can see `<% for page in @getPageCollection("posts").toJSON(): %>`.


`docpadConfig.plugins`

This where we configure our plugins. Recall we added a few earlier. Here's my entire plugins configuration.

```javascript
plugins: {
    tags: {
        extension: '.html',
        injectDocumentHelper: function (doc) {
            return doc.setMeta({
                layout: 'tag'
            });
        }
    },
    rss: {
        "default": {
            collection: 'posts',
            url: '/rss.xml'
        }
    },
    cleanurls: {
        static: true
    },
    dateurls: {
        cleanurl: true,
        trailingSlashes: false,
        collectionName: 'posts',
        dateFormat: '/YYYY/MM'
    },
    browsersync: {
        open: false
    }
}
```

`plugins.tags`
Came pre-configured. It seems that when you create a new post with tags in the YAML, the tags plugin will give some features that the Casper theme has sorted out for us.

`plugins.rss`
Do people still use rss feeds? I don't think I've ever used one. If you're in to that though, this will put a feed of your posts in to the specified url, '/rss.xml' in this case which you can then serve.

`plugins.cleanurls`
Remember that cleanurls plugin we installed earlier? The static: true bit says that we want cleanurls when the site is being statically served. We need this when using the likes of Github Pages.

`plugins.dateurls`
This is where we configure the date bit in a URL if you want that. Just leave this out if you don't.
Here we're saying, use the cleanurls for posts, no need to put a slash at then end of post links and use the format '/YYYY/MM' so we get a URL like http://yourblog/2016/01/my-post

If you blog every day you might like a format such as '/YYYY/MM/DD'.

Date URLS are only used for the specified collection, posts in this case.

`plugins.browsersync`
Just to show how to configure it browsersync. Also that auto opening browser thing kind of bugs me a bit. If you're happy with the defaults (or you're using livereload), no need to put anything in here.

<h3>Adding a Post</h3>

Adding a post is pretty much a case of adding a supported file under the src/render/posts directory. Right away there are two types of file you can use. There are the coffee script template files that end with .eco, so if you have a post called My First Post, you might call the file my-first-post.html.md.eco. You also have plain markdown files so you might call the file my-first-post.html.md. When you run docpad and it does its thing, the outputted file will be called my-first-post.html in both cases.

Whether you use .eco or markdown, you must begin the file with some [YAML](http://www.yaml.org/start.html) that describes the post. This is parsed by docpad when building the posts collection.

In the casper theme, using a .eco file is handy for something like paging. In the generated example template you can see src/render/posts/looking-glass-house.html.md.eco.

In the YAML section, the fact the post is paginated is called out:

isPaged: true
pageCount: 3
pageSize: 1
split: true

The file uses this code:
```coffeescript
<% if @document.page.number is 0: %>
Some content
<% else if @document.page.number is 1: %>
Some more content
<% end %>
```

So the post is all defined on one file but when rendered, is paged. Running locally, if you try it out, you'll see the page number in the URL. When you navigate to the first page it's a normal URL:
http://localhost:9778/posts/looking-glass-house but once you click on a link to the next page you get a number in the URL: http://localhost:9778/posts/looking-glass-house/2

Besides CoffeeScript templates, you can use Markdown. You can also just stick html tags in your post it seems but markdown is a nice way to create content. If you're not used to markdown you could try this site out http://markdowntutorial.com/. There's more on markdown [here](https://daringfireball.net/projects/markdown/).

When you run docpad it will convert your markdown to HTML.

So let's have a look at a kind of Hello World post that I'll call hello-world.html.md

```markdown
---
title: "Hello World"
cover: '/img/hello-masthead.jpg'
isPost: true
active: true
postDate: 'Tue Jan 26 2016'
tags:
 - hello-world
---

<h3>Hello world</h3>

**Hellooooo!!!!**

Bla bla bla

```

At the top you can see the YAML for the post. These values will be used to create a post object in the post collection and the values can be used for templating, filtering, building URLs etc. In the casper theme, you can see the title being overlaid upon the masthead image (/img/hello-masthead.jpg) and being used around the place the represent the post. Tags are used to help filter posts. You can add your own values to the YAML too of course and code the usage any way you like.

After the YAML section you have your content. In the example above I show a HTML header tag being used with some markdown. This will ultimately be converted to a HTML file in the statically generated site.

If you're going to be adding code snippets in your posts a useful plugin is the [highlightjs plugin](https://github.com/docpad/docpad-plugin-highlightjs).

I love the dark them in the Sublime Text editor (even though I've stopped using the editor for a while now). I decided to use that here so these are the steps I went through to add that them to my code snippets for this blog.

```bash
docpad install highlightjs
```

Went here to see what my options are and what they look like: https://highlightjs.org/static/demo/

The styles are all here: https://github.com/isagalaev/highlight.js/tree/8.0/src/styles

Downloaded this file https://github.com/isagalaev/highlight.js/blob/8.0/src/styles/monokai_sublime.css to my src/static/css directory.

in src/layouts/default.html.eco I updated the style block

```coffeescript
<%- @getBlock("styles").add('/css/screen.css').add('//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400').toHTML() %>
```

To include the new file:

```coffeescript
<%- @getBlock("styles").add('/css/screen.css').add('/css/monokai_sublime.css').add('//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400').toHTML() %>
```


The result being I get nice syntax colouring like this JavaScript below:

``` Javascript
function howDoILook() {
  return 'you look beautiful!';
}
```

There's a lot of styles to pick from and you are bound to find one you like. Syntax highlighting is important for the aesthetics of your blog. Maybe some hardcore developers who code review using email might be happy enough to read a blog post without it but most people these days won't even look at a page that doesn't style code a bit as they just take that little bit of extra effort to read.

<h3>Publishing the Blog</h3>

You can host your static site pretty much anywhere. I wanted a convenient way to publish my blog. Something I could perhaps have happen automatically on commit. I decided to use Github Pages for hosting my site. It's free and great for a static site.

To get that working I used the [docpad ghpages plugin](https://github.com/docpad/docpad-plugin-ghpages). The docs on their page show all you need to do but I'll outline it here anyway.

Install the plugin:

```bash
docpad install ghpages
```

Create a repository for your blog on Github. I called mine [ruairitobrien-blog](https://github.com/ruairitobrien/ruairitobrien-blog). Then you need to create a Github repository that follows a particular naming convention to automatically become your Github Pages site i.e. Github will automatically serve up what's in that repository at http://www.{your-github-username}.github.io. If you want your own URL for that you can but I'm not covering that here. The repository just has to use the naming convention {your-github-username}.github.io. Mine is here: https://github.com/ruairitobrien/ruairitobrien.github.io

Why do you need two repositories? Well, you don't really but you would need docpad to output all the generated static site stuff to the root of your project and that would be a bit messy. Better to continue letting docpad put everything in the 'out' directory.

To use the plugin, create a remote called target and set it to your Guthub user name as mentioned here in the docs:

```bash
git remote add target https://github.com/username/username.github.io.git
```

So for me it was:

```bash
git remote add target https://github.com/ruairitobrien/ruairitobrien.github.io.git
```

Then in docpad.js, make sure you configure the plugin in the plugins section:

```Javascript
ghpages: {
    deployRemote: 'target',
    deployBranch: 'master'
}
```

So we are telling the plugin to deploy the master branch to the remote repository that was set to target. This doesn't mean that you are deploying your actual code from your master branch to your Github Pages repository. The plugin initializes a git repository in your 'out' directory, commits everything in the out directory and synchronizes that to your Github Pages repository.

To deploy the app use this command:

```bash
docpad deploy-ghpages --env static
```

You might like to set up some kind of continuous deployment with a CI tool (my favorite tool for that kind of stuff is [Codeship](http://codeship.io/)) or a git hook. I won't go in to that now but perhaps in another post.


<h3>That's It</h3>

I hope you are convinced of the amazing simplicity and value of using a static site generator like docpad. The amount of time it saves and the sheer flexibility and freedom it offers makes it a great choice to get started and hopefully you've found this useful. Thank you for reading!

Please feel free to drop a comment below if you run in to any issues or have any feedback.

Also, the entire code for my blog is here: https://github.com/ruairitobrien/ruairitobrien-blog
