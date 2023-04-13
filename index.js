import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';
import resolvers from './data/resolvers';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const root = resolvers;

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(8080, () => {
  console.log('App listening on port 8080');
});