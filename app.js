const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

var users = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type User {
            _id: ID!
            name: String!
            email: String!
            password: String!
        }

        input UserInput {
            name: String!
            email: String!
            password: String!
        }

        type RootQuery {
            users: [User!]!
        }

        type RootMutation {
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        users: () => {
            return users;
        },
        createUser: (args) => {
            const user = {
                _id: Math.random().toString(),
                name: args.userInput.name,
                email: args.userInput.email,
                password: args.userInput.password
            }
            users.push(user);
            return user;
        }
    },
    graphiql: true
}));

app.listen(3000);

