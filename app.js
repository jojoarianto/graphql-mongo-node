const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            users: [String!]!
        }

        type RootMutation {
            createUser(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        users: () => {
            return ['A', 'B', 'C'];
        },
        createUser: (args) => {
            const userName = args.name;
            return userName;
        }
    },
    graphiql: true
}));

app.listen(3000);

