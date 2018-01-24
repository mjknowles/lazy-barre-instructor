# lazy-barre-instructor

> Automates the work Jessica has to do to make a playlist for her barre classes.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# deploys to heroku - do a build and commit first
npm run deploy
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

Pull down docker build image:

Run the docker image:
docker run -v C:\Users\Michael\Documents\vsts:/vsts-token -v /var/run/docker.sock:/var/run/docker.sock -e VSTS_AGENT='$(hostname)-docker-build-agent' -e VSTS_ACCOUNT=mjknowles -e VSTS_TOKEN_FILE=/vsts-token/token.txt -it microsoft/vsts-agent:ubuntu-16.04-docker-17.12.0-ce-standard