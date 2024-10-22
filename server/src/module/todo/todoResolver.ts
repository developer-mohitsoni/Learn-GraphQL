import prisma from "../../config/database.js";

const todoResolver = {
  Query: {
    todos: async () =>
      await prisma.todo.findMany({
        orderBy: {
          id: "desc",
        },
      }),
  },
  Mutation: {
    createTodo: async (_, { todo }) => {
      const newTodo = await prisma.todo.create({
        data: {
          todo: todo,
          completed: false,
        },
      });

      return newTodo;
    },
  },
};

export default todoResolver;
