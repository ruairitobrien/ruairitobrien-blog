var docpadConfig, moment;

moment = require('moment');

docpadConfig = {
    templateData: {
        site: {
            title: 'Realgorithm',
            tagline: 'How to Win Programs and Influence Code',
            description: 'How to Win Programs and Influence Code.',
            logo: '/img/logo.png',
            url: 'http://realgorithm.io/',
            cover: '/img/kb.jpg',
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
        },
        author: {
            ruairi: {
                name: 'Ruairi O\'Brien',
                img: '/img/rob.jpg',
                url: 'https://github.com/ruairitobrien',
                location: 'Cork, IE',
                bio: 'Code. Code. Code. Family stuff. Play video games. Code.'
            },
            george: {
                name: 'George Boyle',
                img: '/img/george.jpg',
                url: 'https://github.com/Dockheas23',
                location: 'Stockholm, SE',
                bio: ''
            }
        },
        getPreparedTitle: function () {
            if (this.document.title) {
                return this.document.title + " | " + this.site.title;
            } else {
                return this.site.title;
            }
        },
        getDescription: function () {
            if (this.document.description) {
                return this.document.description + " | " + this.site.description;
            } else {
                return this.site.description;
            }
        },
        bodyClass: function () {
            if (this.document.isPost) {
                return "post-template";
            } else {
                return "home-template";
            }
        },
        masthead: function (d) {
            d = d || this.document;
            if (d.cover) {
                return d.cover;
            } else {
                return this.site.cover;
            }
        },
        isCurrent: function (l) {
            if (this.document.section === l.section) {
                return ' nav-current';
            } else if (this.document.url === l.href) {
                return ' nav-current';
            } else {
                return '';
            }
        },
        excerpt: function (p, w) {
            w = w || 26;
            if (p.excerpt) {
                return p.excerpt;
            } else {
                return p.content.replace(/<%.+%>/gi, '').split(' ').slice(0, w).join(' ');
            }
        },
        encode: function (s) {
            return encodeURIComponent(s);
        },
        slug: function (s) {
            return s.toLowerCase().replace(' ', '-');
        },
        currentYear: function () {
            return new Date().getFullYear();
        },
        time: function (ts, format) {
            format = format || 'MMMM DO, YYYY';
            ts = new Date(ts) || new Date();
            return moment(ts).format(format);
        }
    },
    collections: {
        posts: function () {
            return this.getCollection("html").findAllLive({
                active: true,
                isPost: true,
                isPagedAuto: {
                    $ne: true
                }
            }, {
                postDate: -1
            }).on("add", function (model) {
                return model.setMetaDefaults({
                    layout: "post"
                });
            });
        }
    },
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
        ghpages: {
            deployRemote: 'target',
            deployBranch: 'master'
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
};

module.exports = docpadConfig;
