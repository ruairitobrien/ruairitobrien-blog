---
title: "About Communication"
cover: '/img/heads/meeting.jpg'
isPost: true
active: true
excerptOther: 'Is Code Communication?'
postDate: '2016-03-23'
tags:
 - code
 - software
 - thoughts
---

Over the years I have found that the debate about code standards is really never ending that is probably a good thing. However the solutions I have come across for enforcing code quality don't always lend themselves to helping developers produce better code. Why is that and why is it such a contentious issue? There's no simple answer of course but in this post we will look at some aspects of it.

### Code Is Communication

I was in a place where people go the other day writing some code on my laptop when my mind began to drift and I started hearing the conversations going on around me. I wasn't intentionally listening in (OK, I was a bit), I was mostly just feeling the ebb and flow of the conversations. I started to notice just how much people talk and how much of that talk is seemingly about nothing much but that we still put so much energy in to our conversations. If you think about it a certain way, it's all a bit strange. Communication really is a very complex and very interesting thing.

Talking is just one form of communication but a fascinating one. We don't always have a real reason to do it but we keep doing it anyway. It invokes a wide range of feelings in us. The ability to speak well is a very useful and respected skill. Conversely, an inability to speak well can be a real hindrance. Like any skill it can be learned and refined.

Writing is in a similar category. It's a form of communication and a strong writing ability is a great thing to have. Writing is an incredibly powerful medium. Carl Sagan once said about books
>One glance at it and you're inside the mind of another person, maybe somebody dead for thousands of years. Across the millennia, an author is speaking clearly and silently inside your head, directly to you. Writing is perhaps the greatest of human inventions, binding together people who never knew each other, citizens of distant epochs. Books break the shackles of time. A book is proof that humans are capable of working magic.

Speaking and writing can also be considered forms of art in the right context. Is art a form of communication? When you look at a painting or listen to a song, what is the purpose of that? What makes a piece of art good? I think a large part of it is the artist's ability to communicate. This seems to be true in the spoken and written arts and I think it's also true in many other art forms. The ability to clearly transmit some contents of your mind in to the minds of other human beings.

Does this apply to software at all? Could you consider a program's source code a form of communication? Perhaps it's a bit pretentious to say but could you even consider some source code to be a form of art?

It is possible, even helpful, when writing code to imagine you are communicating with somebody as you write it. Admittedly it's most often yourself some time in the future but in many cases it will be other people, even people that you may never know. As you write code you want what you have written to be easy to understand and even aesthetically pleasing. It is interesting to think about why.

It can be said code is just a way to communicate with machines. That is not entirely true anymore. If you were to communicate directly with a machine you would be doing things completely alien to most contemporary programmers. The code we write is designed to be written, read and maintained by humans. Of course a programmer having a deep understanding of the technical aspects is still important. It is just becoming true that writing difficult to read code to suit the compiler or machine is becoming less the priority as compilers/interpreters adapt to optimize for things that suit humans better than them.

As we write more and more code, we start to develop our own preferences about how it should look. We are influenced by code we read, styles we see in books or style guides we come across. So many projects are worked on by more than one developer. Whether it's open source, a startup or in enterprise, the issue of code style is something you will inevitably encounter over and over. How much time is taken up by this? What are the methods you have seen to deal with this issue? Here we will go over some that you will likely have encountered or are likely to if you haven't yet and work as a programmer.

### The Coding Standards/Conventions Document

I will admit at the start that I have some issues with these documents. So much effort goes in to many of them that they almost become sacred texts and we know how humans can get about sacred texts. I know the alternative of having nothing to keep code style consistent is much worse but a document that all developers must read and remember to adhere to is not something that should be considered an acceptable solution either.

One of the first documents of this nature I ever saw was the [Java one](http://www.oracle.com/technetwork/java/codeconventions-150003.pdf) which is nearly 20 years old now. It's a whopper at 24 pages. Some fun light reading that must have brought a lot of pleasure to the life of many a developer.   

There's also the fairly hilarious [Linux Kernel Coding Style Doc](https://www.kernel.org/doc/Documentation/CodingStyle). This at least is funny. There's some good advise at the start too.

>First off, I'd suggest printing out a copy of the GNU coding standards,
and NOT read it.  Burn them, it's a great symbolic gesture.

The GNU standards are tough going and a bit mad (in my humble opinion). Feel free to look [here](https://www.gnu.org/prep/standards/standards.html) and decide that for yourself though.

Google have theirs too such as their [Java Guide](https://google.github.io/styleguide/javaguide.html). It's not too massive at least. It has some things I personally disagree with but that doesn't matter at all. They do make a good point at the start:

>Like other programming style guides, the issues covered span not only aesthetic issues of formatting, but other types of conventions or coding standards as well. However, this document focuses primarily on the hard-and-fast rules that we follow universally, and avoids giving advice that isn't clearly enforceable (whether by human or tool).

The document should be enforceable by a tool. That's very important.

I'll focus on Java a bit here but these points cover a lot of languages indirectly. A particular pain point for me is Javadocs. A code convention that keeps cropping up over and over is the requirement to Javadoc everything. Even private methods! This happens. This is a very bad code convention for a number of reasons.

It's worth exploring the reason a convention like this might exist first. If you are building a library, Javadocs are very handy of course. It's great to have documentation generated in HTML and available to users of your library. Particularly if you consider that they may not even have access to the source code. This is obviously much better than crafting the documents by hand and a convention for Javadocs on public and protected fields makes perfect sense then. No objections there.

What if you're not building a library though as is probably the case most of the time? What if your code is in your application, constantly changing and being released. Not an artifact that gets released occasionally with documentation for a specific version but something being worked on daily by many people who only want to read the code. Do these conventions make sense then? Does a convention to Javadoc private methods ever make sense?

If you go back to the purpose of a convention like this, it should be obvious that having this for all your code is a misinterpretation of the original intention of Javadocs which is really about generating documentation for people who don't need to read your code.

Application code should be easy to read and change. It should be self documenting where possible, friendly to an editor and friendly to human eyes. An application in the majority of cases is not an artifact that needs generated code documentation. The code is what matters. Comments are not code. If you change a comment it will not affect how the application runs. The code is always the truest representation of what a program does. If a developer never reads a single comment they may still understand how a program works.

If code is a form of communication what are comments in relation to it? If a painting is a form of communication, does a painter need to provide notes to go with the painting to help us understand it? If that was the case wouldn't that be a pretty bad painting? OK, that's probably an terrible metaphor. The point though is the description is not the painting or what I really mean, comments are not the code and may even just confuse the reader about the code. Perhaps the worst use of comments is when they are used to gloss over shortcomings in how the code reads.

Code should only in the rarest of cases need comments to be understood. This was not always true and is certainly not true for all languages but for most languages that we use today this is the case. They are designed to be human readable. You can document your code by a good folder structure with good file names and good class name and good function and variable names etc. The ultimate documentation for any code is it's tests. [TDD](https://en.wikipedia.org/wiki/Test-driven_development) is one of the best ways to write clean code and is also one of the best ways to document it.

Don't take my word for it. Look at some projects that we may consider to be well coded. For instance [Fitnesse](https://github.com/unclebob/fitnesse). This is worked on by the author of the book [Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), [Uncle Bob Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin). There are almost no comments in that code base beyond some TODOs and a few small ones scattered here and there (except for the copyrights of course). I also love the package convention there for a Java project. Nothing is more than two or three directories deep. These long package name conventions in Java applications make no sense! Long package names are a library specific thing again that get used everywhere, probably because of a misused coding convention (I have absolutely nothing to back that statement up).

Back to the coding standards document. I am not trying to say they shouldn't exist and all conventions are bad. The comments issue I mentioned above is a symptom of an abidance of such a document being the rule of law that is just a bit too difficult to question and change. We should codify coding standards of course but they should be concise, easy to change and easy to understand. More importantly even than being understandable to developers, the document should be easily consumed by static code analysis tools.

Ideally a coding standard document would be in source control and could be updated and checked in after going through a review process. Once checked in the current document could be used for code analysis and to automatically block merges or however you see fit to use it. Something like [SonarQube](http://www.sonarqube.org) can be configured like this.

Having the coding standard stored and distributed as static document like a PDF for people to study and having it maintained by a small number of people who put a lot of effort and themselves in to it is a recipe for trouble. Wikis are a bit better but still, can be trouble to change. The dynamic of a pull request is better for change than what most Wikis provide. Making it part of the development tool suite that tests it all the time will help ensure that if real problems exist with it, they are more likely to be addressed quickly. Much like a bug in code.

There are a lot of tools that support this type of thing out there. A lot of teams use them already. If you already use a static code analysis tool but also have a coding standard document, it could be time well spent seeing how much of that document could be automated away to your .jshintrc, HLint.hs, lint.xml or whatever you use. Or use something as part of the CI process such as [SonarQube](http://www.sonarqube.org) as I mentioned before. For things like conventions around indentation etc. consider something like [EditorConfig](http://editorconfig.org/). Almost every editor and IDE supports it. Much better than passing around IDE specific code formatting documents. The editor config file should be stored with the source code where it belongs although you may prefer to have a centralized one that gets pulled in somehow.

### The Code Review

The code review is a blessing and a curse. The benefits are that other people will see any code that will be checked in and ideally the code will be well critiqued and understood by at least one other person before being merged. This should lead to better code quality over all. If you're lucky you'll get in to some really interesting discussions and fun arguments and these are very constructive generally.

Code reviews are important but they don't always work as we as we would like. One of the biggest issues I have seen is that pull requests for review are often too large. Nobody wants to read them. I won't go in to this too much as it's well known and really an issue of personal discipline for developers. If there is a feasible way to automate handling such pull request I haven't seen it. This is just something people have to work through in their teams and only the team can decide how best to do that.

Kent Beck recently gave an interview at the [HackSummit](https://hacksummit.org/) which centered a lot around how he's finding working at Facebook. You can see the recording [here](https://www.crowdcast.io/e/hacksummit-2016/12). He mentioned that he had the opportunity to gather real data on subjects that he could only have an opinion on before based on his own knowledge and experience. One very interesting observation he had was that the optimal number of reviewers for a code review is one. If you only have one reviewer then that person has a lot of responsibility to ensure the code is good. A large number of reviewers appears to lead to some issues. You can get some variation of the [bystander effect](https://en.wikipedia.org/wiki/Bystander_effect) or perhaps more accurately a [diffusion of responsibility](https://en.wikipedia.org/wiki/Diffusion_of_responsibility). If the code is difficult to understand, many people will assume it might just be out of their domain and someone else will understand it and review it. If one or two people approve then others may well just approve assuming it's all OK.

Another big issue with pull requests and code reviews is Coding Standards Pollution. For example, a new developer comes along, hasn't really read the coding standards properly, opens a pull request and then hits a saturation of comments about coding standard violations. Anybody coming late to the party may not easily see what the PR was about any more and is hesitant to add any more comments. Maybe nobody even knows what the code does but it looks like it got heavily reviewed. All we see are piles of comments like 'missing Javadoc', 'wrong indentation' and many more. I'm sure you can think of a few to add to that list straight away. Eventually the developer fixes all those and gets an approval for fixing the issues commented on and merges. What are the chances the actual code ever really got reviewed? At least the developer got a good lesson on the coding standards I guess. This really does happen.

Obviously the answer there is to automate all that away with code analysis. In the ideal circumstances no pull request or code review should ever contain a comment about coding standards. All the discussion should be about how well written the code is. How well does it communicate what is supposed to do. If your code is good enough and the tests are extensive enough, nobody should even have to ask what the code does. If they do then might be a sign that the code could be improved. Focusing on code quality over adherence to standards is a much better use of time in a code review.  

### Pair programming

I won't be making any objections to pair programming. Mob programming is another similar method that's worth looking into too. Programming is a very human endeavor. Pair programming is a natural thing to do. If two people can come to a consensus on a piece of code then it's probably OK. If more than two can all agree it's good, that's a beautiful thing.

Pair programming seems to be a good answer to some of the problems mentioned in the Code Review section above and is even touted by some as a way to even avoid code reviews altogether to allow faster code integration. I would say that in most places a code review still makes sense even if pair programming is being practiced but if you find code reviews aren't working as you hoped they would or code quality is a big issue, perhaps try pair programming.

### Conclusions

I made the comment that programming is a very human endeavor. This may not always be the case. Maybe AIs will be replacing all us human coders at some stage but for now at least, coding is still primarily done by humans. Trying to force that act of coding to be a regulated clinical act won't pay off (unless you're trying to build that AI to replace us all). We get better at coding by constantly challenging ourselves and really caring about the code we produce. Not by memorizing and strictly following a large set of rules.

I genuinely believe it's a similar thing to so many creative disciplines. Take writing again as an example. I write code in a similar way to how I might write some text like this blog post. In small units, one or two sentences or a few lines of code:

1. Think about what needs to be communicated
2. Write something out
3. Ensure it fulfills whatever criteria was set out initially
4. Refactor
5. Ensure it still fulfills whatever criteria was set out initially
6. Repeat

Our code is the artifact, the text, the painting, the thing that might be there long after we are (bit melodramatic I know). We should always be focusing on creating the best code. Whatever it takes. Not through standards and regulations but through always asking does the code communicate well enough. Does it look good? Can you quickly understand what this does by reading it? If not, why not?

Every programmer will spend more time reading code than writing it. We should always be able to read it easily or we will be wasting a lot of time. Next time you're doing a review and you see a block of code you don't understand, how will you react? Will you ignore it? Will you say 'please add a comment explaining what this code does'? How about asking is there any way this code can be written that will make it easier to understand?

When you're writing code, remember you are not only programming a computer. You are most likely also communicating with another human mind that might never get to ask you anything about what you've done.

### Some Links

Thank you for reading this blog post. I started this post one day and really blasted it out as a rant about some things that had been on my mind. Subsequent to writing it I ended up researching the subject a little more and thought it worth sharing some links I found interesting.

From one of my favorite blogs [Coding Horror](http://blog.codinghorror.com/) by [Jeff Atwood](https://en.wikipedia.org/wiki/Jeff_Atwood) there's [this post](http://blog.codinghorror.com/coding-without-comments).
It's a great read and does contradict some of what I said here but it's a similar subject and well worth looking at if your interested in it. Another good thread on the subject [here](https://www.quora.com/Are-comments-in-code-a-good-or-bad-thing).

Another one by Jeff Atwood [here](http://blog.codinghorror.com/pair-programming-vs-code-reviews/) on pair programming vs code reviews.

An interesting stack exchange question here which briefly discusses coding standards documents [here](https://programmers.stackexchange.com/questions/196706/creating-a-coding-standards-document)

I read through a lot more but these ones are the ones I was able to find again. It is an interesting subject and I am far from alone in wanting to rant about it. If you've done a bit of ranting on the subject too then please feel free to share in the comments below.
