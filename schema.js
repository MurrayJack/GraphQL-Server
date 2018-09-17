var graphql = require('graphql');

var TodoType = new graphql.GraphQLObjectType({
    name: 'comm',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            from: {
                type: graphql.GraphQLString
            },
            title: {
                type: graphql.GraphQLString
            },
            body: {
                type: graphql.GraphQLString
            },
            sent: {
                type: graphql.GraphQLString
            },
            read: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            comms: {
                type: new graphql.GraphQLList(TodoType),
                args: {
                    id: {
                        type: graphql.GraphQLID
                    },
                },
                resolve: function (value, {
                    id
                }) {
                    var communications = require('./data.json')

                    if (id) {
                        return new Promise(function (resolve, reject) {
                            // this doesnt work! of course it doesnt
                            resolve(communications.filter((item) => item.id === id));
                        });
                    } else {
                        return new Promise(function (resolve, reject) {
                            resolve(communications);
                        });
                    }
                }
            }
        }
    }
});

var mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            create: {
                type: TodoType,
                args: {
                    title: {
                        type: graphql.GraphQLString
                    },
                    completed: {
                        type: graphql.GraphQLBoolean
                    }
                },
                resolve: function (value, {
                    title,
                    completed
                }) {
                    var item = {
                        title,
                        completed
                    }

                    communications.push(item);
                    return item;
                }
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutation
});