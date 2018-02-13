# 📊🌟 project-evaluator

This is a visualisation tool for a survey about projects.

## How it works

Google forms can automatically export to google sheets, which I then use as a data source to build this site.
We use [Gatsby](https://www.gatsbyjs.org/) as a static site generator and the [gatsby-source-google-sheets](https://github.com/brandonmp/gatsby-source-google-sheets) plugin to access google sheets as a data source.

## Running the project

Setup: 

```
$ git clone git@github.com:irisSchaffer/project-evaluator.git
$ cp google-credentials-copy.json google-credentials.json # fill in your credentials
```

In production:
```
$ gatsby build && gatsby serve
```

In development:
```
$ gatsby develop
```

Now open the port it tells you in your browser.
In development you can also play with [GraphiQL](https://github.com/graphql/graphiql) on the path `/___graphql`

## What's still missing?
- deployment
- way of easily re-building the application. Could be a cron job running on the deployment server once a day or similar.
