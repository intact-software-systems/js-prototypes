// const http = require('http')
const app = require('../server/ExpressApp').initialize()

const {graphql, buildSchema} = require('graphql')
var graphqlHTTP = require('express-graphql');

// const server = http.createServer(app)


var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
    console.log(response);
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))