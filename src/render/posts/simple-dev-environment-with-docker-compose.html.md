---
author: 'ruairi'
title: 'Simple development environment setup with docker compose'
isPost: true
active: true
excerptOther: 'Setting up a very simple and repeatable development environment with docker compose.'
postDate: '2018-04-11'
date: '2018-04-11'
tags:
 - software
 - docker
---

I was an early adopter of [vagrant](https://www.vagrantup.com/) back in the day. It was and is a great tool. The ability to configure a development environment in a file you could keep with the source code is great.

Lately I started using [docker compose](https://docs.docker.com/compose/) more and I think for most cases, it's even simpler than vagrant to use. This post will go through how to use docker compose to set up a basic development environment. I am going to use a [NodeJS](https://nodejs.org/) application that connects to a [MySQL](https://www.mysql.com/) database to demonstrate this but all you need to do for other types of applications is change the images you pull in and the startup commands.

A repository showing all the stuff in this post is [here](https://github.com/ruairitobrien/node-mysql-compose). 

## Setup

All you need is to [install docker](https://docs.docker.com/install/) and [install docker compose](https://docs.docker.com/compose/install/). 

## The Scenario

Feel free to skip this section but I wanted to take a moment to mention some of the pain points this solution helps to address. 

You have an application and it connects to a an external service like a database. You probably have the tools to run the application installed but maybe it's a bit annoying, like if for some reason the production environment is stuck on a different version (you're using plain Elastic Beanstalk for example). 

Say the app uses a mysql database. You don't really want to be connecting to a remote one and having it on locally all the time might be overkill. Trying to remember to turn it on and off and just having to administer it in general is a pain.

Not sure if these are issues you have dealt with but I think it's safe to assume you have run in to something similar.

Having your development environment in containers solves all this pretty well. You really only need docker, docker compose and an editor to work on and run your application locally. 

Having your development environment use the same containers as production (assuming you deploy with containers) is even better again!

## The Sample Application

Our sample application will be a NodeJS application generate by the [express application generator](https://expressjs.com/en/starter/generator.html) that connects to a MySQL database. The only other dependency of note is [pm2](http://pm2.keymetrics.io/) which we use to start the application. We can use this for both development and production. It's useful for development in this case as it will automatically restart our server when we edit server files. 

## The Compose Configuration

Here is our docker-compose.yml file in its entirety:

```yaml

version: '3.3'
services:
  mysql:
    image: mysql
    restart: always
    hostname: mysql
    volumes:
      - ./db/seed.sql:/docker-entrypoint-initdb.d/seed.sql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: dev
  web:
    image: keymetrics/pm2:latest-alpine
    restart: always
    links:
      - mysql
    depends_on: 
      - mysql
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app
    environment:
      MYSQL_HOSTNAME: mysql
      MYSQL_USERNAME: root
      MYSQL_PASSWORD: password
      MYSQL_DBNAME: dev
    command: ["pm2-runtime", "start", "pm2.json"]

```

The `version: '3.3'` is important. The capabilities and restrictions from version to version of docker compose are significant. The reference manual for our version is [here](https://docs.docker.com/compose/compose-file/). 

One interesting scenario I ran in to. The [MySQL container](https://hub.docker.com/_/mysql/) (by the way, if you're going to use that container much, the docs for it on the docker page are great and worth reading), when you first start it up, the mysql service is not running. So, when the application starts up the first time it will fail to connect. Next time you start things up it's fine but just the very first time. In version 2 of docker compose you could make the web app container wait to start up until the mysql service was ready by using the `healthcheck` property on the mysql service and the `depends_on` with `condition` on the web service. In version 3 this is no longer allowed because it is better practice to handle connection issues in application code. I have a bit of a hack in the sample code for this which you totally should not copy. I "might" update the sample code to do it properly at some point. A reference to what I mentioned is [here](https://docs.docker.com/compose/startup-order/).

The `services` field is a list of services we want docker compose to manage. A quick side note, these days docker compose is more about local development environments but originally it could be used for deployments too. These days that is being taken over by [docker stacks](https://docs.docker.com/docker-cloud/apps/stacks/). Things may change quickly but for the moment think of docker compose as being good for local stuff and docker stacks for production stuff. We won't mention stacks any more in this post.

### The database configuration

```yaml
mysql:
    image: mysql
    restart: always
    hostname: mysql
    volumes:
      - ./db/seed.sql:/docker-entrypoint-initdb.d/seed.sql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: dev
```

The first field, the name 'mysql' above could be any name. Most people would call that 'db' probably. You will use that to reference this service in other services. 

The `image` in the [MySQL docker image](https://hub.docker.com/_/mysql/). You can also define a tag there e.g. `mysql:8.0.4` if you want a specific version. Otherwise it just uses the latest.

`restart: always` tells compose to restart this image if it crashes. 

`hostname: mysql` you don't actually need this here but if you wanted to change the hostname seen by other services you can use this field. My default other services will use the service name as the hostname. By hostname I mean, other containers can see linked container by using that name. The name will resolve to the IP address of the container. 

`volumes` this is well documented on the mysql docker page. I included it here since it's so useful for local development. In this case we are mounting an sql script in to a particular place in the container so that the very first time the container is created, the script is run against the mysql database. So we can set up a scheme, populate with dummy data etc. Some other things we can do with this are, load a database configuration file and use a database file on our local file system for the database storage. 

`environment` here we can specify environment variables to inject in to the running container. The MySQL container supports a few so here we configure the default database name and the root users password. 

### The web application configuration

```yaml
web:
    image: keymetrics/pm2:latest-alpine
    restart: always
    links:
      - mysql
    depends_on: 
      - mysql
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app
    environment:
      MYSQL_HOSTNAME: mysql
      MYSQL_USERNAME: root
      MYSQL_PASSWORD: password
      MYSQL_DBNAME: dev
    command: ["pm2-runtime", "start", "pm2.json"]
```

`web` is our service name. Could be anything.

`image: keymetrics/pm2:latest-alpine` this is an image provided by the pm2 people but we have many options. We could use the [NodeJS image](https://hub.docker.com/_/node/) and start a little differently `command: ["npm", "start"]` for example. We could also use a custom Dockerfile for our app. If you had a python app or whatever, you could just use the appropriate image for that here instead.

`restart: always` this is part of a terrible hack I put in. When the application fails to connect to MySQL I crash it with a timeout of 1 second. It will restart and try to connect again until it succeeds. It will always succeed eventually and this only happens the first time you create the MySQL image. Very lazy I know, sorry.

```
links:
  - mysql
```

This tells docker to link this container to the mysql one i.e. the container created for the mysql service we defined. 

```
depends_on: 
      - mysql
```

Not much use here but tells the web service to wait until the mysql container has at least started before starting itself.

```
ports:
      - "3000:3000"
```

The node app serves itself on port 3000. This tells docker to take the internal port 3000 and expose it externally on port 3000. The could be any sensible port numbers depending on your needs.


```
volumes:
      - .:/app
```

This mounts our project directory in to an directory called `/app` in the container. 

```
working_dir: /app
```

This tells docker to run any command in the context of that directory. 

```
environment:
      MYSQL_HOSTNAME: mysql
      MYSQL_USERNAME: root
      MYSQL_PASSWORD: password
      MYSQL_DBNAME: dev
```

Pass some environment variables that our app can use to connect to the database. In node we just use `process.env` to access there. For example, to create a database connection we can do:

```javascript
const mysql = require('mysql');
const env = process.env;
const connection = mysql.createConnection({
  host: env.MYSQL_HOSTNAME,
  user: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DBNAME
});
```

Notice also the hostname is simply the name of the linked service. 

Finally we tell compose to run a command to start out app with:

`command: ["pm2-runtime", "start", "pm2.json"]`

This will execute a command in the working directory of the container `/app`. The array is basically just concatenate with spaces to `pm2-runtime start pm2.json`.

## Running the application

Once you have everything set up, starting the application is simply running `docker-compose up` in the directory that contains the compose file.

If you want to delete the containers that were created run `docker-compose rm`.

That's it. You don't even need to install NodeJS or MySQL. Pretty cool!