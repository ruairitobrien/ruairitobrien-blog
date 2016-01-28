---
title: "To Make a Blog"
cover: '/img/hello-masthead.jpg'
isPost: true
active: true
excerptOther: 'In the beginning.'
postDate: 'Tue Jan 26 2016'
tags:
 - first post
 - blog
 - docpad
 - staticgen
---

I decided to make a blog.

I work as a programmer and I guess my main hobby is programming too so deciding to make a blog brought with it a lot of over thinking about how to begin and surprisingly little about what would be blogged.

Should i sign up to a service like [Wordpress](https://wordpress.com/), [Blogger](https://www.blogger.com/home) or [Medium](https://medium.com/)? They're all nice and quick to get started. It occurred ot me though that I already had accounts with all of them and never used them. For a person who enjoys technology, a place on the internet to call your own is bound to be a good thing and the more control you have over it the better. With that thought in mind, sensing that the ready made options don't fit the bill, what are the options?

Build your own blog of course. Endorphins pumping with the dreams of the amazing creation about to unfold, battered to death by a realistic appraisal of the effort involved. We (developers) all know we **can** build a blog site from scratch. We should know that we shouldn't do it.

More options. Set up a [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) server, install wordpress... Even that is a bit of a pain. You become slave to the database. Managing hosting is no fun and can start to hit the pocket. If you create a blog and you're lucky enough to attract a lot of traffic, you now have scaling issues to worry about.  

<h3>Static Site Generators</h3>

While over thinking all this and doing anything but actually starting my blog, I stumbled across static site generators. A novel concept to me. A static site generator is what I went for in the end. Here is a list of reasons why and these are true for the majority of static site generators you may come across, either out of the box or through plugins.

* No database
* Everything in source control
* Markdown
* Full control

<h3>No Database</h3>

You really don't need one to get a standard blog going. What would you ant it for? Posts and Comments? Posts can be generated. Comments can be done using a third party tool like [Disqus](https://disqus.com/). I'll go in to those two facts in detail later but let me just touch on why you're better off without a database.

A database is an extra bit of complexity in your life. If you've set up something like Wordpress, you're stuck with that database. If traffic builds you need to figure out how to scale that database. You need to back it up, optimize it etc. etc. It can be slow. Unless you've built some nice caching (OK maybe there's some easy plugins for that in Wordpress, I don't know), every time a user visits your blog, the database will be queried for almost everything the user sees every time they visit a page. Even if that stuff hasn't changed for ages.

Databases are great of course but in my experience you should only use one if you absolutely need one. I watched a [great talk](https://www.youtube.com/watch?v=asLUTiJJqdE) by Uncle Bob Martin on architecture where he talked about how the team working on [http://www.fitnesse.org/](Fitnesse) got really hung up on the database design at the beginning of the project. Before they ever wrote code or really explored the use cases, the database was a concern. They decided to use a basic file storage model to prototype the app so they could defer major decisions on the database and actually get some real stuff done. In the end they discovered they didn't actually need a database at all. They made databases a plugin option.

<h3>Everything in Source Control</h3>

I just love [https://git-scm.com/](Git). I never once even thought Github and Git were the same thing. Old school Git lover. Using a static site generator, adding content to your site is just adding commits to source control. It's perfect in my opinion. If you have things set up nicely, commit to master and your new blog post is published. You've got a full history. Git is distributed so you'd be very unlucky to loose all your content. What's not to love? Unless you don't like Git. If that's the case though, I have no idea why you've read this far.

<h3>Markdown</h3>

Markdown is grand. Simple and fast. If you've written about a million README files then you know all you need to know about that. It's faster than writing plain HTML. If you know it by heart, it's faster than using an editor with some sort of text formatting ribbon at the top. In the end it becomes HTML so you have full control over how it will look.

<h3>Full Control</h3>

You really do have full control. With very little learning, once you have how the generator works, it's really easy to use. You could write all this stuff in JaavScript and HTML but the generator automated a lot of it but still leaves you full control over how everything looks, where it goes and what's generated. There's no magic and unless you've picked a very bad tool, there's not much restrictions. Just take a little time to learn more about the tool you choose and it will pay off.

<h2>The Stack</h2>

I played around a little with [https://github.com/jekyll/jekyll](Jekyll) and a [http://staticgen.com/](few others) but in the end I settled on [http://docpad.org/](Docpad). It's an excellent tool and I do encourage you to look at their site. I will go through what I needed to do to get it going here.

For source control I use Git and for hosting, at the time of writing I am just using the free service, [https://pages.github.com/](Github pages). Because the site will only have static content, I don't need to worry much about hosting yet at all. Github pages is a nice free option for me.

Beyond that we just need a few docpad plugins and we're all set. I'll go through the plugins as we go.


<h2>Build a Blog</h2>

If you want to use the same method I have to build a blog and follow along here, you will need to install [https://nodejs.org/en/](Node.js) if you don't have it already.

Once installed, you can now install docpad on the command line.

<h3>Install Docpad</h3>

`npm i -g docpad`

On their site instructions they show this as the way to install:

npm install -g npm
npm install -g docpad@6.78

 The number may have changed by the time you read this. I really don't know why they suggest a specific number though. Just `npm i -g docpad` should be fine.

 <h3>Scaffod the Site</h3>

 Create a new directory for your amazing new site. `cd` in to it and run `docpad run`.

 You will get a bunch of output. Here's the beginning of mine:

info: Welcome to DocPad v6.78.4 (global installation: /Users/ruairiobrien/.nvm/v4.2.1/lib/node_modules/docpad)
notice: Please donate to DocPad or have your company sponsor it: http://docpad.org/donate
info: Contribute: http://docpad.org/docs/contribute
info: Plugins:
info: Environment: development
info: Updating the exchange...
This can take a moment...
info: Updated the exchange
info: You are about to create your new project inside your current directory. Below is a list of skeletons to bootstrap your new project:

This is followed by a list of supported skeletons. You can work without a skeleton. I did give it a go. I was abel to get a simple site up and running but I had to resign to the fact that I'm not a very good designer.

Here's the list I was shown:

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

I went with number 2, Casper. It gives you a very nice looking theme. Similar to medium or, I believe a direct copy of what the guys at [https://ghost.org/](Ghost) provide.

So, to pick the casper theme, key the number 2 and hit enter. It will take a bit of time but the operation should complete and you should have a skeleton app created.

You;ll see this in the output too which shows what plugins were installed:

info: Plugins: eco, marked, paged, partials, rss, tags
info: Environment: development
info: Server started on http://0.0.0.0:9778

Now you can naivgate to the skeleton site at http://127.0.0.1:9778. It already looks pretty good.

This gives you a lot of code that doesn't come with the 'no skeleton' option. For the purpose of a blog, this is a good thing I think. Even if you don't like the theme, I'd be inclined to suggest using it anyway and modifying what you need unless you're very comfortable with Docpad already or you really want to start from scratch and have your own specific requirements of how it all should hand together.

Picking the Casper theme creates a project with these plugins and dependencies pre-installed:

* docpad-plugin-eco - for coffescript templates
* docpad-plugin-marked - marked down to html
* docpad-plugin-paged - to support paging
* docpad-plugin-partials - to support partials
* docpad-plugin-rss - to support an rss feed (probably don't really need that)
* docpad-plugin-tags - to support tagging
* moment - date time formatting

If you went with the skeleton option you will likely want to add all these anyway.

`npm i moment --save`
`docpad install eco marked paged partials rss tags`

A quick note on `docpa install`.
It's a handy way to install plugins but you can do so without it by simply using npm install for the plugin and updating the docpad config (more on the docpad config later).

<h3>More Plugins</h3>

Before you go crazy creating actual valuable content, let's procrastinate a little and install a few more plugins. We'll just brush over what they are here and install them. We will go in to more detail about configuring them later.

URLs:

I a normal web app you might build yourself, you'd probably have routes set up for your view with nice URLs. For example: http://yourblog/2016/01/great-post
Becasue we have a static site now we have kind of crappy looking URLs. If you started things up on http://127.0.0.1:9778 you might notice the likes of http://127.0.0.1:9778/posts/hello-post.html. My eyes! The humanity!

Luckily there's a couple of plugins that will sort all that out for us. How these plugins work is kind of interesting and while I could go on about it, I'd suggest a glance at the doc [here](https://github.com/docpad/docpad-plugin-cleanurls) if you're interested. We will need to configure these in a bit but for now, while running things locally, just installing them will do, so run this command:

`docpad install cleanurls dateurls`


Manually refreshing the browser when you make a change is so old school.

`docpad install livereload`

Want more plugin goodness. Check them out [here](http://docpad.org/docs/plugins)


<h3>Configuration</h3>

Creating content is so close now we can almost taste it.

Configuration is the last time consuming bit. This is where we dump out all the old boilerplate stuff we don't need for the generated site, configure how it all works and maybe even throw in a 'Hello World' post.

Lets have a quick look at the exisitng folder structure that came with the Casper theme. If you run a find command (exclude 'out', '.git' and 'node_modules') you should see something like this:

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

All our blog post will be in src/render/posts. I'd recommend emptying that folder now. You may have noticed a mix of .md and .md.eco files in there. Docpad allows you to write markdown and have it converted to HTML. The eco files in there are example of a lsighlty more compltex use case with pages.

./src/render/posts/hello-post.html.md
./src/render/posts/looking-glass-house.html.md.eco
./src/render/posts/style-test.html.md
./src/static/img/bear-masthead.jpg
./src/static/img/carroll-cover.jpg
./src/static/img/cover.jpg
./src/static/img/hello-2-masthead.jpg
./src/static/img/hello-masthead.jpg
./src/static/img/logo.png
./src/static/img/testimg1.jpeg
./src/static/img/testimg2.jpg

If you do delete the images, the site will suddenlyvlook very boring. Finding replacement images may be the hardest thing you ever do. Just a warning.

.eco files are files that use a coffescritp templating language. See [the project page](https://github.com/sstephenson/eco) for more on that.

Ultimately all these files are processed and put in the 'out' directory. If you've had an out directory created already and you end up removing some files, I've found I had to delete the whole out directory since file processing doesn't appear to remove files that were removed fomr the src folder.

You'll want to keep everything in the layouts folder but here are a list of files that are basically OK to delete. I would delete everything under src/render/posts but the other files I list here are optional and safe to remove if you wish:

I must admit, while I've been tempted a few times, I never took the time to learn CoffeeScript. I probably could have hacked away and figured it out but I just don't plan on learnign CoffeeScript, particuarly wiht ES6 around noe. I really do like JavaScript so I decided to rename docpad.coffee to docpad.js and I ran the contents through a converter. http://js2.coffee/ did the trick for me. If you like CoffeeScri[t, great! Leave it as is. Any snippets I give will be JavaScript but are easily ported over.

docpad.js is your main configuration file.

You will see the configuration object created `docpadConfig`. I'll briefly run through its properties here.

`docpadConfig.templateData`

This is all the stuff that will get injected in to your site. I think most of it is fairly obvious. I decided to trim down the navigation preoprty to this:

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

The rest of the templateData object is some data and helpers for formatting dates, text, helping with navigation and other useful stuff. You don't get these in the 'no skeleton' version so even if all you used from the Casper theme was the configuration in docpad.js, you'd be saving a bit of time.

Fill in any values you like and we will move on.

`docpadConfig.collections`

For the purposes of a blog, the default collection here is perfect. It goes in to src/render/posts, gets all our posts (our markdown files) as a collection, specifies the layout src/layout/post.html.ect. These get converted to nice HTML files for us in the out directory. The collection can query using the YAML at the start of a post (more on that soon) and the collection can be used in our template code. For example in src/partials/loop.html.eco you can see `<% for page in @getPageCollection("posts").toJSON(): %>`.


`docpadConfig.plugins`

This where we configure our plugins. Recall we added a few earlier. Here's my entire plugins configuration.

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
    }
}

`plugins.tags`
Came pre-configured. It seems that when you create a new post with tags in the YAML, the tags plugin will give some features that the Casper theme has sorted out for us.

`plugins.rss`
Do people still use rss feeds? I don't think I've ever used one. If you're in to that though, this will put a feed of your posts in to the specified url, '/rss.xml' in this case which you can then serve.

`plugins.cleanurls`
Remember that cleanurls plugin we installed earlier? The static: true bit says that we want cleanurls when the site is being statically served. We need this when using the likes of Github Pages.

`plugins.dateurls`
This is where we configure the date bit in a URL, if you want that. Just leave this out if you don't.
Here we're saying, use the cleanurls for posts, no need to put a slash at then end of post links and use the format '/YYYY/MM' so we get a URL like http://yourblog/2016/01/my-post

If you blog every day you might like a format such as '/YYYY/MM/DD'.

Date URLS are only used for the specified collection, posts in this case.


<h3>Adding a Post</h3>


<h3>Publishing the Blog</h3>
