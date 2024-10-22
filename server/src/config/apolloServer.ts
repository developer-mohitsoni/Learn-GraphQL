import { ApolloServer } from "@apollo/server";
import todosSchema from "../module/todo/todosSchema.js";
import todoResolver from "../module/todo/todoResolver.js";

const apolloServer = new ApolloServer({
  typeDefs: todosSchema,
  resolvers: todoResolver,
});

export default apolloServer;
