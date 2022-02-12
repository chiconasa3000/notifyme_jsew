
# Chapter 17: Deployment a Web Application


## Requirements

We need three things to make this.

* Host out DB on MongoAtlas
* Host our GrapQl Api with Heroku and use configs in order to set db driver
* Host our Web App with Netlify

## Previous Deployment of our GraphQl Api

In chapter 10: Deploying Api, we remember this...

## Hosting Our Database

It is neccesary to host our database with some architecture or platform which help us to mantain the storage, scalability, and replications properties, in this case using a cluster, Mongo includes
free hosting in order to create this architecture, with mongodb cloud atlas, and we could select different platforms such as Amazon, Google, or Azure cloud services. It only needs to set some parameters
which are the next...

- Whitelist address in this case 0.0.0.0/0 allows dynamic Ips
- Username and password, They will be include in the generated driver so it is neccesary to remember these parameters.
- Select an app connection type, because for GrapgQl Api, and node version that you used.

With all this set configuration, it generates connection string that you put your username, password name of your app and copy this for testing and for next configuration in netlify, this connection
url is like this:

```
mongodb+srv://username:password@hexcode
```

this is the information of the cluster with the three nodes
![mongo_clusters](imgs/mongo_clusters.png)
![mongo_deploy](imgs/mongo_database_deploy.png)
these are the collections inside of mongo database
![mongo_notes](imgs/mongo_collections_notes.png)
![mongo_users](imgs/mongo_collections_users.png)

Then for deployment you need heroku in order build and deploy your GraphQl api, in this case you need heroku cli tools, and create an app in heroku web application. It needs other configuration
parameters such us...

- NOVE_ENV what kind of deployment is, in this case it is production
- JWT_KEY which is our json web token and the name of variable must be similar in the code "JWT_KEY"
- DB_HOST here you put the connection string which mongo atlas gave you.

Then in your local machine connect to heroku with cli tools, it is similar to github repository, locates the directory or workspace of your GraphQl and set the remote heroku repository in this case the
name of your APP, then add changes to stage, commit this changes, and finally, push your commits on heroku repository. It make all build process and deploy your GraphQl Api. like this...
```
heroku git:remote -a <Your_app_name>
git add .
git commit -am "application ready for production"
git push heroku master
```

This is the log of heroku when make request to the api
![heroku_deploy](imgs/heroku_deploy_logs.png)
![heroku_logs](imgs/heroku_logs.png)

In order to test our api, we visit our api url, and it only said how to make a query in this case uses curl in order to obtain a response for api like this...
```
curl \
-X POST \
-H "Content-Type: application/json" \
--data '{ "query": "{ notes { id } }" }' \
https://YOUR_APP_NAME.herokuapp.com/api

```

It will return and empty notes because the db is empty yet

```
{"data":{"notes":[]}
```



## Static Websites

When we will make build actions on notedly_web it wrappes HTML, CSS, and JavaScript files in order to produce a static website. we need to call the command ``` npm run deploy:src ``` which executes
``` parcel build src/index.html --public url ``` but it has already been configured on package.json, there exist some render JSX on server, it is called 'Universal Javascript', it includes Javascript
fallbacks and SEO actions. The other framework that you need to see is Next.js in order to do this.


## Hosting Source Code with Git

Netlify charges of deploying frontend app, with different kind of repositories: Github, Bitbucket or Gitlab and you need some configuration parameters too. 

- Select your repository where you allocate your notedly_web
- put the build directory, you could include base path or subdirectory in order to build internal directory
- build command: in this case the same command for building notedly_web is run deploy:src
- dist directory: it will locate inside of notedly_web/web or when you execute the build command
- API_URI: it is the address of your graphql api which heroku gave you: it is ``` https://<your_api_name>.herokuapp.com/api```

With all this build configuration, deploy your site and then netlify generates a url in order to view the page created.

This is the general information of netlify
![netlify_deploy](imgs/netlify_deploy.png)


And finally our web app deploy with the next url

```
https://peaceful-hermann-c96c3d.netlify.app/
```

![notifyme_deploy](imgs/notifyme_deploy.png)

It is a minimal completed app... awesome! 🚀 🥳 
