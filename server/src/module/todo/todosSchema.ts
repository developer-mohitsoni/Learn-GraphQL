const todosSchema = `#graphql

    scalar Date

type Todo {
    id: Int!
    todo: String
    completed: Boolean!
    created_at: Date
}

type Query {
    todos: [Todo]
}
`;
