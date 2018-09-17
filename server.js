var express = require('express')
var graphQLHTTP = require('express-graphql')
var schema = require('./schema')

var app = express()
  .use('/', graphQLHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  }))
  .listen(8090, function (err) {
    console.log('GraphQL Server is now running on localhost:8080');
  });