import { ApolloServer } from "@apollo/server";
import todoResolver from "../module/todo/todoResolver.js";
import todosSchema from "../module/todo/todosSchema.js";

const apolloServer = new ApolloServer({
	typeDefs: todosSchema,
	resolvers: todoResolver
});

export default apolloServer;
