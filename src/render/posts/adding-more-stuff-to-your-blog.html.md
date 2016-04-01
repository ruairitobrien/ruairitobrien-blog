---
title: "Adding More Stuff to Your Blog"
cover: '/img/heads/fire.jpg'
isPost: true
active: true
excerptOther: 'How to put some extra functionality in to your statically generated docpad blog.'
postDate: 'Fri April 1 2016 GMT'
tags:
- blog
- docpad
- staticgen
- email
- analytics
---

What I will cover here hardly even needs a blog post but since I went through how to build a blog with docpad in [my first post](http://ruairitobrien.github.io/2016/04/to-make-a-blog/) it sort of makes sense to continue on that subject as I make updates to this blog.

I am going to add the ability for visitors to my blog to sign up to my yet to be created mailing list and I am going to add some analytics so I can see if anyone actually visits my site. Probably setting myself up for some depressing results here but these two features are just useful to have in any blog I think.

## Mailing list

For this I used [MailChimp](http://mailchimp.com/). I created an account with them and then blundered my way through creating a mailing list. There are many other options besides MailChimp out there so use whatever one you prefer. The instructions aren't likely to change too much. MailChimp just happens to have an easy setup and a free plan so that's why I went with them. Important to note that when you are creating an account with MailChimp and I presume any other mail service, you will be asked to provide a real physical address. This is a legal requirement and will be available to anybody you email using that service. Just something to be aware of.

Once your account is set up the option to create a mailing list will be shown to you. You'll be asked for some basic details. To give you an idea of what, I've put a picture of the form below.

![alt text](/img/adding-more-stuff-to-your-blog/create-list.png "Create List")

If you use a free email address (like a gmail address) as the 'default from address' you will get a warning telling you people may not get the emails. Ideally you would have your own domain and your own email address to use for that to avoid this issue.

Next step is to create a form.

![alt text](/img/adding-more-stuff-to-your-blog/create-form.png "Create Form")

You will probably want to use either the Embedded forms or the Subscriber popup option. When you select one of those options you will be able to customize things a little and then you will be given some code that you can paste in to your blog.

I chose to put my form in the right navigation menu so I pasted an embedded form in to `src/partials/navigation.html.eco` just after the site navigation 'ul' element. You can see the result by clicking the menu button at the top of this page.

Now that you have a form on your site, hopefully somebody might subscribe and you can email them. In MailChimp you can set up a campaign to do this. You can use some email template there and send it to everyone on the list either manually or at regular intervals. There's a lot of options there. If you want to fully automate the sending of emails, there does appear to be a way to send content from an RSS feed so if you have RSS setup for you blog (went through that in the first blog post), you may be able to use that.

## Analytics

For this I am going to use [Google Analytics](https://www.google.ie/analytics/). If you have set this up before then there's really nothing new here. If you haven't, don't worry it's really simple.

You will need a Google account. I'll just assume you have one here. Go to the Google Analytics site at https://www.google.ie/analytics, sign in with your Google account and go to admin settings. In the admin section you should see an option to **Create a New Property**.

![alt text](/img/adding-more-stuff-to-your-blog/create-property.png "Create Property")

Fill out the fields with your site name and URL and click the **Get Tracking ID** button. You'll then be shown some code to paste in to your site.

![alt text](/img/adding-more-stuff-to-your-blog/tracking-id.png "Tracking ID")

You'll probably want to put this code at the bottom of `src/layouts/default.html.eco` or whatever your default layout file is if it is different. This will ensure all visits to your blog get tracked.


That's it. Very little to it and very straight forward.
