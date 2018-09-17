var graphql = require('graphql');

var TODOs = [{
        "id": 1446412739542,
        "title": "Read emails",
        "completed": false
    },
    {
        "id": 1446412740883,
        "title": "Buy orange",
        "completed": true
    }
];

var TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(TODOs)
                        }, 0)
                    });
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
                resolve: function (value, {title, completed }) {
                    var item = {
                        title, completed
                    }
                    
                    TODOs.push(item);
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